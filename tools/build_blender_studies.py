"""Original procedural portfolio studies. Run with Blender 4.5 --background --python.
No downloaded models or textures. Geometry, materials and studio lights are editable.
"""
import bpy, math, json
from pathlib import Path
from mathutils import Vector

OUT = Path(__file__).resolve().parents[1] / 'assets' / 'studies'
OUT.mkdir(parents=True, exist_ok=True)

def material(name, color, metallic=0, roughness=.45):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Metallic'].default_value=metallic; p.inputs['Roughness'].default_value=roughness
    return m

def cube(name, loc, size, mat, bevel=.025):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o=bpy.context.object; o.name=name
    o.dimensions=size; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    if bevel:
        b=o.modifiers.new('Machined edge','BEVEL'); b.width=bevel; b.segments=3
        o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return o

def cyl(name,loc,radius,depth,mat,rot=(0,0,0),vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc,rotation=rot)
    o=bpy.context.object; o.name=name; o.data.materials.append(mat)
    b=o.modifiers.new('Edge radius','BEVEL'); b.width=.008; b.segments=3
    for p in o.data.polygons: p.use_smooth=True
    o.modifiers.new('Normals','WEIGHTED_NORMAL'); return o

def sphere(name,loc,scale,mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=12,location=loc)
    o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def line(name,a,b,radius,mat):
    delta=Vector(b)-Vector(a); o=cyl(name,(Vector(a)+Vector(b))/2,radius,delta.length,mat)
    o.rotation_euler=delta.to_track_quat('Z','Y').to_euler(); return o

def label(body,loc,size,mat,rot=(0,0,0)):
    bpy.ops.object.text_add(location=loc,rotation=rot); o=bpy.context.object
    o.name='Engraving '+body; o.data.body=body; o.data.size=size; o.data.extrude=.0004
    o.data.materials.append(mat); return o

def light(name,loc,power,size,target=(0,0,0)):
    bpy.ops.object.light_add(type='AREA',location=loc); o=bpy.context.object; o.name=name
    o.data.energy=power; o.data.shape='DISK'; o.data.size=size
    o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()

def setup():
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
    sc=bpy.context.scene; sc.render.engine='CYCLES'; sc.cycles.samples=32; sc.cycles.use_denoising=True
    sc.render.resolution_x=1500; sc.render.resolution_y=1050; sc.render.resolution_percentage=100
    sc.world.color=(.22,.22,.22); sc.view_settings.view_transform='AgX'
    sc.render.image_settings.file_format='PNG'; sc.render.film_transparent=False
    return sc

def camera(loc,target,scale):
    bpy.ops.object.camera_add(location=loc); o=bpy.context.object; o.name='Editorial camera'
    o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
    o.data.type='ORTHO'; o.data.ortho_scale=scale; bpy.context.scene.camera=o
    return o

def save_render(slug, sc, cam, detail):
    sc['project_note']='Original personal concept, October 2026. Procedural Blender/Python modeling with AI assistance. No client or manufactured product.'
    stats={'objects':len(sc.objects),'mesh_objects':sum(o.type=='MESH' for o in sc.objects),'blender':bpy.app.version_string}
    (OUT/(slug+'-stats.json')).write_text(json.dumps(stats,indent=2),encoding='utf-8')
    bpy.ops.wm.save_as_mainfile(filepath=str(OUT/(slug+'.blend')),compress=True)
    sc.render.filepath=str(OUT/(slug+'.png')); bpy.ops.render.render(write_still=True)
    cam.location=detail[0]; cam.rotation_euler=(Vector(detail[1])-cam.location).to_track_quat('-Z','Y').to_euler(); cam.data.ortho_scale=detail[2]
    sc.render.filepath=str(OUT/(slug+'-detail.png')); bpy.ops.render.render(write_still=True)

sc=setup()
aluminum=material('Bead blasted aluminium',(.53,.57,.58),.82,.3)
black=material('Graphite polymer',(.026,.032,.035),.18,.34)
ink=material('Warm black engraving',(.055,.066,.062),.1,.45)
cream=material('Warm studio paper',(.72,.69,.62),0,.82)
orange=material('Signal orange enamel',(.86,.19,.055),.18,.35)
white=material('Ivory ink',(.85,.87,.82),0,.5)
rubber=material('Rubber feet',(.018,.022,.025),0,.85)
cube('Continuous aluminium enclosure',(0,0,.39),(3.9,2.45,.6),aluminum,.14)
cube('Top panel gasket',(0,0,.706),(3.63,2.18,.028),black,.08)
cube('Removable instrument panel',(0,0,.727),(3.59,2.14,.027),aluminum,.06)
for x in [-1.65,1.65]:
    for y in [-.92,.92]:
        cyl('Torx screw',(x,y,.754),.048,.024,black)
        cube('Screw slot',(x,y,.769),(.055,.014,.004),aluminum,.002)
for x in [-1.4,1.4]:
    for y in [-.85,.85]:cyl('Isolation foot',(x,y,.06),.17,.12,rubber)
for i in range(24):
    cube('Vent slot %02d'%i,(-1.45+i*.125,.74,.752),(.045,.22,.012),black,.016)
for i,x in enumerate([-.98,-.28]):
    cyl('Input gain bezel',(x,.02,.776),.22,.05,black)
    cyl('Input gain dial',(x,.02,.845),.17,.13,black)
    for j in range(32):
        a=j*math.tau/32
        cyl('Knurl gain', (x+math.cos(a)*.17,math.sin(a)*.17,.845),.008,.105,aluminum,vertices=12)
    cube('Gain indicator',(x,.105,.914),(.025,.085,.007),white,.003)
    label('GAIN %d'%(i+1),(x-.19,-.36,.755),.07,ink)
    for j in range(5):
        cyl('Signal meter',(x-.13+j*.067,.43,.755),.016,.01,orange if j==4 else ink,vertices=20)
x=1.03
cyl('Master dial base',(x,-.04,.783),.39,.06,black)
cyl('Master control',(x,-.04,.91),.35,.2,aluminum)
for j in range(80):
    a=j*math.tau/80
    cyl('Radial grip', (x+math.cos(a)*.35,-.04+math.sin(a)*.35,.92),.008,.145,black,vertices=8)
cube('Master indicator',(x,.16,1.017),(.025,.14,.008),orange,.004)
label('MONITOR',(.7,-.65,.755),.092,ink)
label('FIELD / 02',(-1.46,-.91,.755),.14,ink)
label('DESKTOP AUDIO INTERFACE',(.15,-.91,.755),.046,ink)
for x in [-1.28,-.53]:
    cyl('XLR socket surround',(x,-1.232,.42),.22,.035,black,(math.pi/2,0,0))
    cyl('XLR inner recess',(x,-1.258,.42),.163,.028,rubber,(math.pi/2,0,0))
    for dx,dz in [(-.055,.035),(.055,.035),(0,-.06)]:
        cyl('Connector pin',(x+dx,-1.281,.42+dz),.018,.029,aluminum,(math.pi/2,0,0),24)
for x in [.67,1.23]:
    cyl('Headphone socket ring',(x,-1.235,.42),.115,.039,aluminum,(math.pi/2,0,0))
    cyl('Headphone socket',(x,-1.26,.42),.072,.026,black,(math.pi/2,0,0))
for x in [-1.2,-.8,-.4,0,.4,.8,1.2]:cube('Rear fin',(x,1.234,.43),(.12,.045,.3),black,.012)
cube('Infinite studio floor',(0,0,-.08),(200,200,.1),cream,0)
light('Large key',(-3,-4,7),950,5); light('Edge reflection',(3,2,5),1100,3);light('Soft front',(1,-5,2),120,4)
cam=camera((5,-6.5,6),(0,0,.4),6.8)
save_render('field-audio',sc,cam,((3,-4.3,3.8),(.3,-.15,.55),4.8))

sc=setup()
plaster=material('Mineral plaster',(.71,.67,.57),0,.88)
oak=material('Smoked oak',(.29,.17,.083),0,.58)
lightoak=material('Oak top',(.51,.34,.17),0,.48)
fabric=material('Natural linen',(.69,.62,.46),0,.96)
steel=material('Dark powder coat',(.045,.06,.057),.35,.4)
sage=material('Sage ceramics',(.25,.34,.24),0,.6)
leafmat=material('Ficus leaves',(.075,.19,.066),0,.46)
paper=material('Book pages',(.84,.8,.69),0,.82)
screen=material('Warm display',(.11,.17,.18),.2,.36)
cube('Architectural plinth',(0,0,-.14),(5.7,4.9,.3),plaster,.035)
for i in range(19):cube('Oak floor board',(i*.29-2.61,0,.02),(.282,4.7,.04),lightoak,.002)
cube('Rear plaster wall',(0,2.35,1.75),(5.7,.14,3.5),plaster,.008)
cube('Left wall lower',(-2.78,0,.52),(.14,4.7,1.04),plaster,.005)
cube('Left wall upper',(-2.78,0,3.16),(.14,4.7,.68),plaster,.005)
for y in [-2.25,.1,2.22]:cube('Window jamb',(-2.78,y,1.96),(.18,.13,1.85),oak,.005)
cube('Window sill',(-2.65,0,1.05),(.48,4.6,.1),lightoak,.01)
for i in range(18):cube('Acoustic oak slat',(.35+i*.13,2.23,1.77),(.07,.09,3.4),oak,.01)
cube('Desk top',(-.35,.62,1.12),(3.65,1.32,.12),lightoak,.05)
for x in [-1.88,1.18]:
    for y in [.1,1.14]:cube('Desk leg',(x,y,.57),(.09,.09,1.1),steel,.015)
cube('Monitor housing',(-.2,1.02,1.79),(1.45,.075,.88),steel,.04)
cube('Display',(-.2,.975,1.8),(1.33,.012,.74),screen,.02)
cube('Monitor stand',(-.2,1.02,1.36),(.07,.09,.35),steel,.01)
cube('Monitor base',(-.2,.96,1.2),(.52,.35,.035),steel,.02)
cube('Keyboard base',(-.25,.25,1.204),(.94,.32,.035),steel,.02)
for row in range(4):
    for col in range(13):cube('Keycap',(-.67+col*.067,.15+row*.064,1.233),(.057,.051,.025),paper,.006)
cube('Space bar',(-.23,.105,1.232),(.38,.046,.025),paper,.006)
sphere('Mouse',(.5,.24,1.245),(.095,.14,.045),paper)
for i in range(3):
    cube('Design book pages',(-1.52,.7,1.25+i*.085),(.46,.65,.066),paper,.006)
    cube('Book cover',(-1.52,.7,1.215+i*.085),(.48,.67,.012),sage if i%2 else oak,.003)
cyl('Coffee cup',(1.07,.34,1.31),.105,.24,sage)
cyl('Coffee surface',(1.07,.34,1.435),.087,.007,steel)
cyl('Lamp base',(-1.48,1.04,1.2),.23,.04,steel)
line('Lamp stem',(-1.48,1.04,1.21),(-1.48,1.04,2.23),.024,steel)
bpy.ops.mesh.primitive_cone_add(vertices=64,radius1=.3,radius2=.11,depth=.24,location=(-1.48,1.04,2.17));bpy.context.object.data.materials.append(sage);bpy.context.object.name='Spun metal lamp shade'
cube('Linen seat',(-.22,-.73,.69),(1.02,.9,.2),fabric,.15)
back=cube('Curved upholstered back',(-.22,-1.12,1.22),(1.03,.17,.87),fabric,.12);back.rotation_euler[0]=-.1
for x in [-.61,.17]:
    for y in [-1.02,-.43]:line('Chair leg',(x,y,.64),(x*1.2,y*1.14,.08),.035,oak)
for x in [-.79,.35]:line('Arm rest',(x,-1.02,1.02),(x,-.36,1.02),.042,oak)
cyl('Plant pot',(2.05,1.15,.35),.34,.66,sage)
line('Ficus trunk',(2.05,1.15,.65),(2.05,1.15,2.15),.026,oak)
for i in range(15):
    angle=i*2.4; z=.9+i*.082; a=(2.05,1.15,z); b=(2.05+math.cos(angle)*.43,1.15+math.sin(angle)*.43,z+.18)
    line('Ficus branch',a,b,.01,oak)
    ob=sphere('Ficus leaf',b,(.2,.09,.025),leafmat);ob.rotation_euler=(.3,angle/2,angle)
for z in [1.2,1.9,2.6]:
    cube('Wall shelf',(-1.53,2.13,z),(1.66,.36,.07),lightoak,.01)
    for i in range(6):cube('Library book',(-2.2+i*.11,2.12,z+.2),(.085,.2,.34+(.06 if i%2 else 0)),sage if i%2 else fabric,.003)
cube('Display pedestal',(1.99,-1.38,.35),(.8,.75,.7),plaster,.025)
cyl('Vase foot',(1.99,-1.38,.74),.15,.09,oak)
sphere('Ceramic vessel',(1.99,-1.38,.94),(.23,.23,.24),sage)
cyl('Vase neck',(1.99,-1.38,1.17),.09,.17,sage)
cube('Studio floor',(0,0,-.37),(200,200,.1),material('Background',(.79,.76,.69),0,.9),0)
light('Daylight from window',(-5,-1,6),1250,4,(0,0,.5));light('Ceiling bounce',(1,-2,7),700,5,(0,0,0));light('Warm fill',(4,0,4),280,3)
cam=camera((7,-9,7),(0,.3,1.05),8.4)
save_render('quiet-workspace',sc,cam,((4,-6,4.7),(-.35,.65,1.3),5.7))
