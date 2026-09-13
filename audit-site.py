"""Read-only static and HTTP audit; results stay outside the published artifact."""
import concurrent.futures, collections, html, json, pathlib, re, urllib.request, urllib.error
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'audit-results'
OUT.mkdir(exist_ok=True)
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags=[]; self.ids=[]; self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs); self.tags.append((tag,attrs))
        if 'id' in attrs: self.ids.append(attrs['id'])
pages={p.name:(p.read_text(encoding='utf-8'),Page(p.read_text(encoding='utf-8'))) for p in ROOT.glob('*.html')}
issues=[]; external=set(); inventory=[]
for name,(source,page) in pages.items():
    if name.startswith('google'): continue
    headings=sum(t=='h1' for t,a in page.tags)
    if headings!=1: issues.append([name,'h1-count',headings])
    for id,count in collections.Counter(page.ids).items():
        if count>1: issues.append([name,'duplicate-id',id])
    for block in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>([\s\S]*?)</script>',source):
        try: json.loads(block)
        except ValueError as e: issues.append([name,'invalid-jsonld',str(e)])
    for t,a in page.tags:
        if t=='img' and 'alt' not in a: issues.append([name,'missing-alt',a.get('src')])
        for key in ('href','src'):
            link=a.get(key,'')
            if not link or link.startswith(('mailto:','tel:','data:')): continue
            u=urlsplit(urljoin('https://taxinfo.solutions/'+name,link))
            if u.netloc!='taxinfo.solutions':
                if u.scheme in ('http','https'): external.add(link)
                continue
            target=unquote(u.path).lstrip('/') or 'index.html'
            if not (ROOT/target).exists(): issues.append([name,'missing-local-target',link])
            elif u.fragment and target in pages and unquote(u.fragment) not in pages[target][1].ids:
                issues.append([name,'missing-fragment',link])
    inventory.append({'page':name,'h1':headings,'bytes':len(source.encode()),'adsense_loaders':source.count('pagead/js/adsbygoogle.js'),'replacement_characters':source.count('\ufffd')})
(OUT/'static.json').write_text(json.dumps({'issues':issues,'pages':inventory,'external_urls':sorted(external)},indent=2),encoding='utf-8')
print(json.dumps({'pages':len(inventory),'issues':issues,'external_urls':len(external)},indent=2))
def fetch(url):
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; TaxInfoAudit/1.0)'})
        with urllib.request.urlopen(req,timeout=20) as r:
            data=r.read()
            return {'url':url,'status':r.status,'final_url':r.url,'type':r.headers.get('Content-Type'),'bytes':len(data),'headers':dict(r.headers)}
    except Exception as e: return {'url':url,'error':str(e)}
if __name__=='__main__':
    import sys
    if '--live' in sys.argv:
        urls=['https://taxinfo.solutions/'+('' if n=='index.html' else n) for n in pages]
        urls += ['https://taxinfo.solutions/'+n for n in ('ads.txt','robots.txt','sitemap.xml','not-a-real-taxinfo-page-audit')]
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(fetch,urls))
        (OUT/'live.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
        print(json.dumps([{k:r[k] for k in ('url','status','error') if k in r} for r in results],indent=2))
    if '--external' in sys.argv:
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(fetch,sorted(external)))
        (OUT/'external.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
        print(json.dumps([{k:r[k] for k in ('url','status','error') if k in r} for r in results if r.get('status')!=200],indent=2))
