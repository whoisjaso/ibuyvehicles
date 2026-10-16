"""
Rebuilds the vector replica of the iBuy Vehicles logo from the original raster's
measured geometry. Run from the repo root:
  npm install --no-save @fontsource/open-sans
  python3 -m pip install fonttools brotli pillow
  python3 scripts/build_logo.py
Writes public/brand/emblem-original.svg and the logo lockups.
"""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import os
F='node_modules/@fontsource/open-sans/files/open-sans-latin-%s-normal.woff2'
fonts={w:TTFont(F%w) for w in ('400','500','600')}

def text_path(s, x, baseline, size, weight='400', target_width=None):
    f=fonts[weight]; upm=f['head'].unitsPerEm; cmap=f.getBestCmap(); gs=f.getGlyphSet(); hmtx=f['hmtx']
    names=[cmap[ord(c)] for c in s]
    adv=sum(hmtx[n][0] for n in names)*size/upm
    track=0
    if target_width and len(s)>1: track=(target_width-adv)/(len(s)-1)
    pen=SVGPathPen(gs); cx=x
    for n in names:
        t=TransformPen(pen,(size/upm,0,0,-size/upm,cx,baseline))
        gs[n].draw(t)
        cx+=hmtx[n][0]*size/upm+track
    return pen.getCommands(), cx

import math
def blade(t0, t1, tip_k, detach):
    cx,cy,rx,ry=356,256,276,167
    pts_o=[];pts_i=[]
    n=90
    for j in range(n+1):
        t=t0+(t1-t0)*j/n
        u=j/n
        ko=1.0+tip_k*(u**0.75)
        ki=1.0 if u<detach else 1.0+tip_k*((u-detach)/(1-detach))**1.6
        a=math.radians(t)
        pts_o.append((cx+ko*rx*math.cos(a), cy+ko*ry*math.sin(a)))
        pts_i.append((cx+(ki-0.02)*rx*math.cos(a), cy+(ki-0.02)*ry*math.sin(a)))
    pts=pts_o+pts_i[::-1]
    return 'M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in pts)+'Z'
TOP=blade(168,309,0.22,0.78)
BOT=blade(-12,128,0.30,0.80)
# --- Emblem, drawn in the 6x zoom space of the original crop (170,0)-(300,90) ---
RED='#d42127'; BLUE='#2343b4'; NAVY='#132a78'; DISC='#1d3da9'; LIGHT='#7f9cf0'
emblem=f'''
<g id="emblem">
  <path fill="{BLUE}" d="{TOP}"/>
  <path fill="{BLUE}" d="{BOT}"/>
  <ellipse cx="356" cy="256" rx="257" ry="148" fill="none" stroke="{RED}" stroke-width="38"/>
  <ellipse cx="356" cy="256" rx="234" ry="128" fill="#ffffff"/>
  <ellipse cx="356" cy="256" rx="226" ry="121" fill="{NAVY}"/>
  <ellipse cx="356" cy="256" rx="212" ry="111" fill="{DISC}"/>
  <g fill="none" stroke="{NAVY}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
    <path d="M244 312V252Q244 230 260 220L283 184Q291 172 305 172H407Q421 172 429 184L452 220Q468 230 468 252V312Z"/>
    <path d="M272 216L291 188H421L440 216Z"/>
    <path d="M322 292H390"/>
    <path d="M244 220H228M468 220H484"/>
  </g>
  <g fill="{NAVY}">
    <rect x="250" y="306" width="36" height="24" rx="6"/>
    <rect x="426" y="306" width="36" height="24" rx="6"/>
  </g>
  <g fill="{LIGHT}">
    <path d="M262 250L304 262L300 274L266 266Z"/>
    <path d="M450 250L408 262L412 274L446 266Z"/>
  </g>
</g>'''

def lockup(fg, red_dot=RED):
    # Original geometry (520 x 138): iBuy x65-172, emblem x183-277, Vehicles x287-493, baseline 68, cap 37.6; tagline x140-493 baseline 104.
    cap=0.714; big=38/cap; small=20.5/cap
    ibuy,_=text_path('\u0131Buy',66,68.5,big,'500',target_width=106)
    veh,_=text_path('Vehicles',287,68.5,big,'500',target_width=201)
    t1,x1=text_path('Get paid top ',0,0,small,'400')
    t2,x2=text_path('Dollar',x1+1,0,small,'600')
    t3,x3=text_path(' today!',x2,0,small,'400')
    k=348/x3  # tagline scaled as one unit to the original's width (x 140 to 488, baseline 110)
    tm1,_=text_path('TM',489,27,8/cap,'500')
    tm2,_=text_path('TM',265,76,5.2/cap,'500')
    return f'''<g fill="{fg}"><path d="{ibuy}"/><path d="{veh}"/><g transform="translate(140 110) scale({k:.4f})"><path d="{t1}"/><path d="{t2}"/><path d="{t3}"/></g><path d="{tm1}"/><path d="{tm2}"/></g>
<circle cx="71" cy="31.5" r="4.2" fill="{red_dot}"/>
<g transform="translate(170 0) scale(0.16667)">{emblem}</g>'''

def svg(body, vb):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">{body}</svg>'

out='public/brand/'
# Lockup without mascot (vector), starting where the wordmark begins.
open(out+'logo-lockup-on-dark.svg','w').write(svg(lockup('#ffffff'),'60 4 452 116'))
open(out+'logo-lockup-on-light.svg','w').write(svg(lockup('#0e0e12'),'60 4 452 116'))
# Full lockup including the original mascot, embedded as the original raster until it is redrawn.
import base64
from PIL import Image
im=Image.open(out+'original-logo.png').convert('RGBA').crop((0,0,64,138))
im.save('/tmp/mascot-crop.png')
b64=base64.b64encode(open('/tmp/mascot-crop.png','rb').read()).decode()
open(out+'logo-full-on-dark.svg','w').write(svg(f'<image href="data:image/png;base64,{b64}" x="0" y="0" width="64" height="138"/>'+lockup('#ffffff'),'0 4 512 134'))
# Emblem alone, exact replica.
open(out+'emblem-original.svg','w').write(svg(emblem,'60 36 610 455'))
print('written')
