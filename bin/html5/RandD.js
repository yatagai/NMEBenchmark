(function () { "use strict";
var $_, $hxClasses = {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.completed = null;
ApplicationMain.preloader = null;
ApplicationMain.total = null;
ApplicationMain.loaders = null;
ApplicationMain.urlLoaders = null;
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new Hash();
	ApplicationMain.urlLoaders = new Hash();
	ApplicationMain.total = 0;
	ApplicationMain.preloader = new NMEPreloader();
	jeash.Lib.jeashGetCurrent().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var loader = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/nowloading.png",loader);
	ApplicationMain.total++;
	var loader1 = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/themes/theme0/tex_blue0.png",loader1);
	ApplicationMain.total++;
	var loader2 = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/themes/theme0/tex_blue_house0.png",loader2);
	ApplicationMain.total++;
	var loader3 = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/themes/theme0/tex_red0.png",loader3);
	ApplicationMain.total++;
	var loader4 = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/themes/theme0/tex_red_house0.png",loader4);
	ApplicationMain.total++;
	var loader5 = new jeash.display.Loader();
	ApplicationMain.loaders.set("graphics/standard/themes/theme0/tex_search_obj0.png",loader5);
	ApplicationMain.total++;
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader6 = ApplicationMain.loaders.get(path);
			loader6.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader6.load(new jeash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new jeash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(jeash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(jeash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	jeash.Lib.jeashGetCurrent().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(com.nmeapp.app.Main,"main") == null) jeash.Lib.jeashGetCurrent().addChild(new com.nmeapp.app.Main()); else Reflect.field(com.nmeapp.app.Main,"main").apply(com.nmeapp.app.Main,[]);
}
ApplicationMain.prototype = {
	__class__: ApplicationMain
}
var jeash = {}
jeash.text = {}
jeash.text.Font = function() {
	this.jeashMetrics = [];
	this.jeashFontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(jeash.text.Font.jeashFontData == null) {
		jeash.text.Font.jeashFontData = [];
		jeash.text.Font.jeashFontData["Bitstream_Vera_Sans"] = jeash.text.Font.DEFAULT_FONT_DATA;
	}
	this.jeashSetFontName(className == "jeash.text.Font"?"Bitstream_Vera_Sans":className.split(".").pop());
};
$hxClasses["jeash.text.Font"] = jeash.text.Font;
jeash.text.Font.__name__ = ["jeash","text","Font"];
jeash.text.Font.jeashFontData = null;
jeash.text.Font.jeashOfResource = function(name) {
	var data = haxe.Resource.getString(name);
	if(data == null) throw "Resource data for string '" + name + "' not found.";
	jeash.text.Font.jeashFontData[name] = haxe.Resource.getString(name);
}
jeash.text.Font.prototype = {
	fontName: null
	,jeashMetrics: null
	,jeashGlyphData: null
	,jeashFontScale: null
	,jeashSetScale: function(scale) {
		this.jeashFontScale = scale / 1024;
	}
	,jeashGetAdvance: function(inGlyph,height) {
		var m = this.jeashMetrics[inGlyph];
		if(m == null) {
			var glyph = this.jeashGlyphData.get(inGlyph);
			if(glyph == null) return 0;
			this.jeashMetrics[inGlyph] = m = glyph._width * this.jeashFontScale | 0;
		}
		if(m == null) return 0;
		return m;
	}
	,jeashRender: function(graphics,inChar,inX,inY,inOutline) {
		var index = 0;
		var glyph = this.jeashGlyphData.get(inChar);
		if(glyph == null) return;
		var commands = glyph.commands;
		var data = glyph.data;
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c) {
			case 1:
				graphics.moveTo(inX + data[index++] * this.jeashFontScale,inY + data[index++] * this.jeashFontScale);
				break;
			case 2:
				graphics.lineTo(inX + data[index++] * this.jeashFontScale,inY + data[index++] * this.jeashFontScale);
				break;
			case 3:
				graphics.curveTo(inX + data[index++] * this.jeashFontScale,inY + data[index++] * this.jeashFontScale,inX + data[index++] * this.jeashFontScale,inY + data[index++] * this.jeashFontScale);
				break;
			}
		}
	}
	,jeashSetFontName: function(name) {
		this.fontName = name;
		if(jeash.text.Font.jeashFontData[this.fontName] == null) try {
			jeash.text.Font.jeashOfResource(name);
		} catch( e ) {
			jeash.Lib.trace("Glyph data for font '" + name + "' does not exist, defaulting to '" + "Bitstream_Vera_Sans" + "'.");
			this.fontName = "Bitstream_Vera_Sans";
		}
		this.jeashGlyphData = haxe.Unserializer.run(jeash.text.Font.jeashFontData[this.fontName]);
		return name;
	}
	,__class__: jeash.text.Font
	,__properties__: {set_fontName:"jeashSetFontName"}
}
var NME_font_yutapon_coding_081_ttf = function() {
	jeash.text.Font.call(this);
};
$hxClasses["NME_font_yutapon_coding_081_ttf"] = NME_font_yutapon_coding_081_ttf;
NME_font_yutapon_coding_081_ttf.__name__ = ["NME_font_yutapon_coding_081_ttf"];
NME_font_yutapon_coding_081_ttf.__super__ = jeash.text.Font;
NME_font_yutapon_coding_081_ttf.prototype = $extend(jeash.text.Font.prototype,{
	__class__: NME_font_yutapon_coding_081_ttf
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,__class__: Hash
}
var Selection = function() { }
$hxClasses["Selection"] = Selection;
Selection.__name__ = ["Selection"];
Selection.prototype = {
	anchorNode: null
	,anchorOffset: null
	,focusNode: null
	,focusOffset: null
	,isCollapsed: null
	,rangeCount: null
	,collapse: null
	,collapseToStart: null
	,collapseToEnd: null
	,selectAllChildren: null
	,deleteFromDocument: null
	,getRangeAt: null
	,addRange: null
	,removeRange: null
	,removeAllRanges: null
	,stringifier: null
	,__class__: Selection
}
var MessagePortArray = function() { }
$hxClasses["MessagePortArray"] = MessagePortArray;
MessagePortArray.__name__ = ["MessagePortArray"];
MessagePortArray.prototype = {
	__class__: MessagePortArray
}
var MessagePort = function() { }
$hxClasses["MessagePort"] = MessagePort;
MessagePort.__name__ = ["MessagePort"];
MessagePort.prototype = {
	postMessage: null
	,start: null
	,close: null
	,onmessage: null
	,__class__: MessagePort
}
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,__class__: IntHash
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
jeash.events = {}
jeash.events.IEventDispatcher = function() { }
$hxClasses["jeash.events.IEventDispatcher"] = jeash.events.IEventDispatcher;
jeash.events.IEventDispatcher.__name__ = ["jeash","events","IEventDispatcher"];
jeash.events.IEventDispatcher.prototype = {
	addEventListener: null
	,dispatchEvent: null
	,hasEventListener: null
	,removeEventListener: null
	,willTrigger: null
	,__class__: jeash.events.IEventDispatcher
}
jeash.events.EventDispatcher = function(target) {
	if(target != null) this.jeashTarget = target; else this.jeashTarget = this;
	this.jeashEventMap = [];
};
$hxClasses["jeash.events.EventDispatcher"] = jeash.events.EventDispatcher;
jeash.events.EventDispatcher.__name__ = ["jeash","events","EventDispatcher"];
jeash.events.EventDispatcher.__interfaces__ = [jeash.events.IEventDispatcher];
jeash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
jeash.events.EventDispatcher.prototype = {
	jeashTarget: null
	,jeashEventMap: null
	,getList: function(type) {
		return this.jeashEventMap[type];
	}
	,setList: function(type,list) {
		this.jeashEventMap[type] = list;
	}
	,existList: function(type) {
		return this.jeashEventMap[type] != undefined;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new jeash.events.Listener(inListener,capture,priority));
		list.sort(jeash.events.EventDispatcher.compareListeners);
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.jeashTarget;
		var capture = event.eventPhase == jeash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.jeashGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: jeash.events.EventDispatcher
}
jeash.display = {}
jeash.display.IBitmapDrawable = function() { }
$hxClasses["jeash.display.IBitmapDrawable"] = jeash.display.IBitmapDrawable;
jeash.display.IBitmapDrawable.__name__ = ["jeash","display","IBitmapDrawable"];
jeash.display.IBitmapDrawable.prototype = {
	drawToSurface: null
	,__class__: jeash.display.IBitmapDrawable
}
jeash.display.DisplayObject = function() {
	this.parent = null;
	jeash.events.EventDispatcher.call(this,null);
	this.jeashSetX(this.jeashSetY(0));
	this.jeashScaleX = this.jeashScaleY = 1.0;
	this.alpha = 1.0;
	this.jeashSetRotation(0.0);
	this.mMatrix = new jeash.geom.Matrix();
	this.mFullMatrix = new jeash.geom.Matrix();
	this.mMask = null;
	this.mMaskingObj = null;
	this.mBoundsRect = new jeash.geom.Rectangle();
	this.mBoundsDirty = true;
	this.mGraphicsBounds = null;
	this.mMaskHandle = null;
	this.name = "DisplayObject " + jeash.display.DisplayObject.mNameID++;
	this.jeashFilters = [];
	this.jeashSetVisible(true);
};
$hxClasses["jeash.display.DisplayObject"] = jeash.display.DisplayObject;
jeash.display.DisplayObject.__name__ = ["jeash","display","DisplayObject"];
jeash.display.DisplayObject.__interfaces__ = [jeash.display.IBitmapDrawable];
jeash.display.DisplayObject.__super__ = jeash.events.EventDispatcher;
jeash.display.DisplayObject.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	x: null
	,y: null
	,scaleX: null
	,scaleY: null
	,rotation: null
	,alpha: null
	,name: null
	,width: null
	,height: null
	,visible: null
	,mouseX: null
	,mouseY: null
	,parent: null
	,stage: null
	,loaderInfo: null
	,mBoundsDirty: null
	,mMtxChainDirty: null
	,mMtxDirty: null
	,mBoundsRect: null
	,mGraphicsBounds: null
	,mScale9Grid: null
	,mMatrix: null
	,mFullMatrix: null
	,jeashX: null
	,jeashY: null
	,jeashScaleX: null
	,jeashScaleY: null
	,jeashRotation: null
	,jeashVisible: null
	,jeashLastOpacity: null
	,mScrollRect: null
	,mOpaqueBackground: null
	,mMask: null
	,mMaskingObj: null
	,mMaskHandle: null
	,jeashFilters: null
	,toString: function() {
		return this.name;
	}
	,jeashDoAdded: function(inObj) {
		if(inObj == this) {
			var evt = new jeash.events.Event(jeash.events.Event.ADDED,true,false);
			evt.target = inObj;
			this.dispatchEvent(evt);
		}
		if(this.jeashIsOnStage()) {
			var evt = new jeash.events.Event(jeash.events.Event.ADDED_TO_STAGE,false,false);
			evt.target = inObj;
			this.dispatchEvent(evt);
		}
	}
	,jeashDoRemoved: function(inObj) {
		if(inObj == this) {
			var evt = new jeash.events.Event(jeash.events.Event.REMOVED,true,false);
			evt.target = inObj;
			this.dispatchEvent(evt);
		}
		var evt = new jeash.events.Event(jeash.events.Event.REMOVED_FROM_STAGE,false,false);
		evt.target = inObj;
		this.dispatchEvent(evt);
		var gfx = this.jeashGetGraphics();
		if(gfx != null && jeash.Lib.jeashIsOnStage(gfx.jeashSurface)) jeash.Lib.jeashRemoveSurface(gfx.jeashSurface);
	}
	,jeashSetParent: function(parent) {
		if(parent == this.parent) return;
		this.mMtxChainDirty = true;
		if(this.parent != null) {
			this.parent.__removeChild(this);
			this.parent.jeashInvalidateBounds();
		}
		if(parent != null) parent.jeashInvalidateBounds();
		if(this.parent == null && parent != null) {
			this.parent = parent;
			this.jeashDoAdded(this);
		} else if(this.parent != null && parent == null) {
			this.parent = parent;
			this.jeashDoRemoved(this);
		} else this.parent = parent;
	}
	,GetStage: function() {
		return jeash.Lib.jeashGetStage();
	}
	,AsContainer: function() {
		return null;
	}
	,GetScrollRect: function() {
		if(this.mScrollRect == null) return null;
		return this.mScrollRect.clone();
	}
	,jeashAsInteractiveObject: function() {
		return null;
	}
	,SetScrollRect: function(inRect) {
		this.mScrollRect = inRect;
		return this.GetScrollRect();
	}
	,jeashGetMouseX: function() {
		return this.globalToLocal(new jeash.geom.Point(this.GetStage().jeashGetMouseX(),0)).x;
	}
	,jeashSetMouseX: function(x) {
		return null;
	}
	,jeashGetMouseY: function() {
		return this.globalToLocal(new jeash.geom.Point(0,this.GetStage().jeashGetMouseY())).y;
	}
	,jeashSetMouseY: function(y) {
		return null;
	}
	,GetTransform: function() {
		return new jeash.geom.Transform(this);
	}
	,SetTransform: function(trans) {
		this.mMatrix = trans.jeashGetMatrix().clone();
		return trans;
	}
	,getFullMatrix: function(childMatrix) {
		if(childMatrix == null) return this.mFullMatrix.clone(); else return childMatrix.mult(this.mFullMatrix);
	}
	,getBounds: function(targetCoordinateSpace) {
		if(this.mMtxDirty || this.mMtxChainDirty) this.jeashValidateMatrix();
		if(this.mBoundsDirty) this.BuildBounds();
		var mtx = this.mFullMatrix.clone();
		mtx.concat(targetCoordinateSpace.mFullMatrix.clone().invert());
		var rect = this.mBoundsRect.transform(mtx);
		return rect;
	}
	,globalToLocal: function(inPos) {
		return this.mFullMatrix.clone().invert().transformPoint(inPos);
	}
	,jeashGetNumChildren: function() {
		return 0;
	}
	,jeashGetMatrix: function() {
		return this.mMatrix.clone();
	}
	,jeashSetMatrix: function(inMatrix) {
		this.mMatrix = inMatrix.clone();
		return inMatrix;
	}
	,jeashGetGraphics: function() {
		return null;
	}
	,GetOpaqueBackground: function() {
		return this.mOpaqueBackground;
	}
	,SetOpaqueBackground: function(inBG) {
		this.mOpaqueBackground = inBG;
		return this.mOpaqueBackground;
	}
	,GetBackgroundRect: function() {
		if(this.mGraphicsBounds == null) {
			var gfx = this.jeashGetGraphics();
			if(gfx != null) this.mGraphicsBounds = gfx.jeashExtent.clone();
		}
		return this.mGraphicsBounds;
	}
	,jeashInvalidateBounds: function() {
		this.mBoundsDirty = true;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
	}
	,jeashInvalidateMatrix: function(local) {
		if(local == null) local = false;
		this.mMtxChainDirty = this.mMtxChainDirty || !local;
		this.mMtxDirty = this.mMtxDirty || local;
	}
	,jeashValidateMatrix: function() {
		if(this.mMtxDirty || this.mMtxChainDirty && this.parent != null) {
			if(this.mMtxChainDirty && this.parent != null) this.parent.jeashValidateMatrix();
			if(this.mMtxDirty) {
				this.mMatrix.b = this.mMatrix.c = this.mMatrix.tx = this.mMatrix.ty = 0;
				this.mMatrix.a = this.jeashScaleX;
				this.mMatrix.d = this.jeashScaleY;
				var rad = this.jeashRotation * Math.PI / 180.0;
				if(rad != 0.0) this.mMatrix.rotate(rad);
				this.mMatrix.tx = this.jeashX;
				this.mMatrix.ty = this.jeashY;
			}
			if(this.parent != null) this.mFullMatrix = this.parent.getFullMatrix(this.mMatrix); else this.mFullMatrix = this.mMatrix;
			this.mMtxDirty = this.mMtxChainDirty = false;
		}
	}
	,jeashRender: function(inMatrix,inMask,clipRect) {
		var gfx = this.jeashGetGraphics();
		if(gfx != null) {
			if(!this.jeashVisible) return;
			if(this.mMtxDirty || this.mMtxChainDirty) this.jeashValidateMatrix();
			var m = inMatrix != null?inMatrix:this.mFullMatrix.clone();
			if(this.jeashFilters != null && (gfx.jeashChanged || inMask != null)) {
				if(gfx.jeashRender(inMask,m)) this.jeashInvalidateBounds();
				var _g = 0, _g1 = this.jeashFilters;
				while(_g < _g1.length) {
					var filter = _g1[_g];
					++_g;
					filter.jeashApplyFilter(gfx.jeashSurface);
				}
			} else if(gfx.jeashRender(inMask,m)) this.jeashInvalidateBounds();
			m.tx = m.tx + gfx.jeashExtent.x * m.a + gfx.jeashExtent.y * m.c;
			m.ty = m.ty + gfx.jeashExtent.x * m.b + gfx.jeashExtent.y * m.d;
			var premulAlpha = (this.parent != null?this.parent.alpha:1) * this.alpha;
			if(inMask != null) jeash.Lib.jeashDrawToSurface(gfx.jeashSurface,inMask,m,premulAlpha,clipRect); else {
				jeash.Lib.jeashSetSurfaceTransform(gfx.jeashSurface,m);
				if(premulAlpha != this.jeashLastOpacity) {
					jeash.Lib.jeashSetSurfaceOpacity(gfx.jeashSurface,premulAlpha);
					this.jeashLastOpacity = premulAlpha;
				}
			}
		} else if(this.mMtxDirty || this.mMtxChainDirty) this.jeashValidateMatrix();
	}
	,drawToSurface: function(inSurface,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(matrix == null) matrix = new jeash.geom.Matrix();
		this.jeashRender(matrix,inSurface,clipRect);
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null;
		var gfx = this.jeashGetGraphics();
		if(gfx != null) {
			var extX = gfx.jeashExtent.x;
			var extY = gfx.jeashExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.jeashGetScaleX() > this.jeashGetWidth() || (local.y - extY) * this.jeashGetScaleY() > this.jeashGetHeight()) return null;
			switch( (this.GetStage().jeashPointInPathMode)[1] ) {
			case 0:
				if(gfx.jeashHitTest(local.x,local.y)) return this;
				break;
			case 1:
				if(gfx.jeashHitTest(local.x * this.jeashGetScaleX(),local.y * this.jeashGetScaleY())) return this;
				break;
			}
		}
		return null;
	}
	,GetMask: function() {
		return this.mMask;
	}
	,SetMask: function(inMask) {
		if(this.mMask != null) this.mMask.mMaskingObj = null;
		this.mMask = inMask;
		if(this.mMask != null) this.mMask.mMaskingObj = this;
		return this.mMask;
	}
	,jeashSetFilters: function(filters) {
		if(filters == null) this.jeashFilters = null; else {
			this.jeashFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.jeashFilters.push(filter.clone());
			}
		}
		return filters;
	}
	,jeashGetFilters: function() {
		if(this.jeashFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.jeashFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,BuildBounds: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx == null) this.mBoundsRect = new jeash.geom.Rectangle(this.jeashGetX(),this.jeashGetY(),0,0); else {
			this.mBoundsRect = gfx.jeashExtent.clone();
			if(this.mScale9Grid != null) {
				this.mBoundsRect.width *= this.jeashGetScaleX();
				this.mBoundsRect.height *= this.jeashGetScaleY();
			}
		}
		this.mBoundsDirty = false;
	}
	,jeashGetInteractiveObjectStack: function(outStack) {
		var io = this.jeashAsInteractiveObject();
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.jeashGetInteractiveObjectStack(outStack);
	}
	,jeashFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.jeashGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.jeashSetPhase(jeash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.jeashDispatchEvent(event);
				if(event.jeashGetIsCancelled()) return;
			}
		}
		event.jeashSetPhase(jeash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.jeashDispatchEvent(event);
		if(event.jeashGetIsCancelled()) return;
		if(event.bubbles) {
			event.jeashSetPhase(jeash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.jeashDispatchEvent(event);
				if(event.jeashGetIsCancelled()) return;
			}
		}
	}
	,jeashBroadcast: function(event) {
		this.jeashDispatchEvent(event);
	}
	,jeashDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return jeash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,dispatchEvent: function(event) {
		var result = this.jeashDispatchEvent(event);
		if(event.jeashGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,jeashAddToStage: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx != null) {
			jeash.Lib.jeashSetSurfaceId(gfx.jeashSurface,this.name);
			jeash.Lib.jeashAppendSurface(gfx.jeashSurface);
		}
	}
	,jeashInsertBefore: function(obj) {
		var gfx1 = this.jeashGetGraphics();
		var gfx2 = obj.jeashIsOnStage()?obj.jeashGetGraphics():null;
		if(gfx1 != null) {
			jeash.Lib.jeashSetSurfaceId(gfx1.jeashSurface,this.name);
			if(gfx2 != null) jeash.Lib.jeashAppendSurface(gfx1.jeashSurface,gfx2.jeashSurface); else jeash.Lib.jeashAppendSurface(gfx1.jeashSurface);
		}
	}
	,jeashIsOnStage: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx != null) return jeash.Lib.jeashIsOnStage(gfx.jeashSurface);
		return false;
	}
	,jeashGetVisible: function() {
		return this.jeashVisible;
	}
	,jeashSetVisible: function(visible) {
		var gfx = this.jeashGetGraphics();
		if(gfx != null) {
			if(gfx.jeashSurface != null) jeash.Lib.jeashSetSurfaceVisible(gfx.jeashSurface,visible);
		}
		this.jeashVisible = visible;
		return visible;
	}
	,jeashGetHeight: function() {
		this.BuildBounds();
		return this.jeashScaleY * this.mBoundsRect.height;
	}
	,jeashSetHeight: function(inHeight) {
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		var h = this.mBoundsRect.height;
		if(this.jeashScaleY * h != inHeight) {
			if(h <= 0) return 0;
			this.jeashScaleY = inHeight / h;
			this.jeashInvalidateMatrix(true);
		}
		return inHeight;
	}
	,jeashGetWidth: function() {
		if(this.mBoundsDirty) this.BuildBounds();
		return this.jeashScaleX * this.mBoundsRect.width;
	}
	,jeashSetWidth: function(inWidth) {
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		var w = this.mBoundsRect.width;
		if(this.jeashScaleX * w != inWidth) {
			if(w <= 0) return 0;
			this.jeashScaleX = inWidth / w;
			this.jeashInvalidateMatrix(true);
		}
		return inWidth;
	}
	,jeashGetX: function() {
		return this.jeashX;
	}
	,jeashGetY: function() {
		return this.jeashY;
	}
	,jeashSetX: function(n) {
		this.jeashInvalidateMatrix(true);
		this.jeashX = n;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		return n;
	}
	,jeashSetY: function(n) {
		this.jeashInvalidateMatrix(true);
		this.jeashY = n;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		return n;
	}
	,jeashGetScaleX: function() {
		return this.jeashScaleX;
	}
	,jeashGetScaleY: function() {
		return this.jeashScaleY;
	}
	,jeashSetScaleX: function(inS) {
		if(this.jeashScaleX == inS) return inS;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		this.jeashScaleX = inS;
		return inS;
	}
	,jeashSetScaleY: function(inS) {
		if(this.jeashScaleY == inS) return inS;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		this.jeashScaleY = inS;
		return inS;
	}
	,jeashSetRotation: function(n) {
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		this.jeashRotation = n;
		return n;
	}
	,jeashGetRotation: function() {
		return this.jeashRotation;
	}
	,__class__: jeash.display.DisplayObject
	,__properties__: {get_stage:"GetStage",set_mouseY:"jeashSetMouseY",get_mouseY:"jeashGetMouseY",set_mouseX:"jeashSetMouseX",get_mouseX:"jeashGetMouseX",set_visible:"jeashSetVisible",get_visible:"jeashGetVisible",set_height:"jeashSetHeight",get_height:"jeashGetHeight",set_width:"jeashSetWidth",get_width:"jeashGetWidth",set_rotation:"jeashSetRotation",get_rotation:"jeashGetRotation",set_scaleY:"jeashSetScaleY",get_scaleY:"jeashGetScaleY",set_scaleX:"jeashSetScaleX",get_scaleX:"jeashGetScaleX",set_y:"jeashSetY",get_y:"jeashGetY",set_x:"jeashSetX",get_x:"jeashGetX"}
});
jeash.display.InteractiveObject = function() {
	jeash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.jeashSetTabIndex(0);
	this.name = "InteractiveObject";
};
$hxClasses["jeash.display.InteractiveObject"] = jeash.display.InteractiveObject;
jeash.display.InteractiveObject.__name__ = ["jeash","display","InteractiveObject"];
jeash.display.InteractiveObject.__super__ = jeash.display.DisplayObject;
jeash.display.InteractiveObject.prototype = $extend(jeash.display.DisplayObject.prototype,{
	doubleClickEnabled: null
	,mouseEnabled: null
	,tabEnabled: null
	,tabIndex: null
	,jeashTabIndex: null
	,toString: function() {
		return this.name;
	}
	,jeashAsInteractiveObject: function() {
		return this;
	}
	,jeashGetTabIndex: function() {
		return this.jeashTabIndex;
	}
	,jeashSetTabIndex: function(inIndex) {
		this.jeashTabIndex = inIndex;
		return inIndex;
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,__class__: jeash.display.InteractiveObject
	,__properties__: $extend(jeash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"jeashSetTabIndex",get_tabIndex:"jeashGetTabIndex"})
});
jeash.display.DisplayObjectContainer = function() {
	this.jeashChildren = new Array();
	this.mLastSetupObjs = new Array();
	this.mouseChildren = true;
	this.numChildren = 0;
	this.tabChildren = true;
	jeash.display.InteractiveObject.call(this);
	this.name = "DisplayObjectContainer " + jeash.display.DisplayObject.mNameID++;
};
$hxClasses["jeash.display.DisplayObjectContainer"] = jeash.display.DisplayObjectContainer;
jeash.display.DisplayObjectContainer.__name__ = ["jeash","display","DisplayObjectContainer"];
jeash.display.DisplayObjectContainer.__super__ = jeash.display.InteractiveObject;
jeash.display.DisplayObjectContainer.prototype = $extend(jeash.display.InteractiveObject.prototype,{
	jeashChildren: null
	,mLastSetupObjs: null
	,numChildren: null
	,mouseChildren: null
	,tabChildren: null
	,AsContainer: function() {
		return this;
	}
	,jeashBroadcast: function(event) {
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,BuildBounds: function() {
		jeash.display.InteractiveObject.prototype.BuildBounds.call(this);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			if(obj.jeashGetVisible()) {
				var r = obj.getBounds(this);
				if(r.width != 0 || r.height != 0) {
					if(this.mBoundsRect.width == 0 && this.mBoundsRect.height == 0) this.mBoundsRect = r.clone(); else this.mBoundsRect.extendBounds(r);
				}
			}
		}
	}
	,jeashInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(this.mMtxChainDirty == false && this.mMtxDirty == false) {
			var _g = 0, _g1 = this.jeashChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.jeashInvalidateMatrix();
			}
		}
		this.mMtxChainDirty = this.mMtxChainDirty || !local;
		this.mMtxDirty = this.mMtxDirty || local;
	}
	,jeashDoAdded: function(inObj) {
		jeash.display.InteractiveObject.prototype.jeashDoAdded.call(this,inObj);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashDoAdded(inObj);
		}
	}
	,jeashDoRemoved: function(inObj) {
		jeash.display.InteractiveObject.prototype.jeashDoRemoved.call(this,inObj);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashDoRemoved(inObj);
		}
	}
	,GetBackgroundRect: function() {
		var r = jeash.display.InteractiveObject.prototype.GetBackgroundRect.call(this);
		if(r != null) r = r.clone();
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			if(obj.jeashGetVisible()) {
				var o = obj.GetBackgroundRect();
				if(o != null) {
					var trans = o.transform(obj.mMatrix);
					if(r == null || r.width == 0 || r.height == 0) r = trans; else if(trans.width != 0 && trans.height != 0) r.extendBounds(trans);
				}
			}
		}
		return r;
	}
	,jeashGetNumChildren: function() {
		return this.jeashChildren.length;
	}
	,jeashRender: function(inMatrix,inMask,clipRect) {
		if(!this.jeashGetVisible()) return;
		jeash.display.InteractiveObject.prototype.jeashRender.call(this,inMatrix,inMask,clipRect);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			if(obj.jeashGetVisible()) {
				if(clipRect != null) {
					var rect = new jeash.geom.Rectangle();
					if(obj.mMtxDirty || obj.mMtxChainDirty) obj.jeashValidateMatrix();
					rect.set_topLeft(obj.globalToLocal(clipRect.get_topLeft()));
					rect.set_bottomRight(obj.globalToLocal(clipRect.get_bottomRight()));
					obj.jeashRender(null,inMask,rect);
				} else obj.jeashRender(null,inMask,null);
			}
		}
	}
	,addChild: function(object) {
		if(object == this) throw "Adding to self";
		if(object.parent == this) {
			this.setChildIndex(object,this.jeashChildren.length - 1);
			return object;
		}
		if(this.jeashIsOnStage()) object.jeashAddToStage();
		this.jeashChildren.push(object);
		object.jeashSetParent(this);
		return object;
	}
	,jeashAddToStage: function() {
		jeash.display.InteractiveObject.prototype.jeashAddToStage.call(this);
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.jeashChildren[i].jeashAddToStage();
		}
	}
	,jeashInsertBefore: function(obj) {
		jeash.display.InteractiveObject.prototype.jeashInsertBefore.call(this,obj);
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.jeashChildren[i].jeashAddToStage();
		}
	}
	,getChildIndex: function(child) {
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i] == child) return i;
		}
		return -1;
	}
	,removeChild: function(child) {
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i] == child) {
				child.jeashSetParent(null);
				return;
			}
		}
		throw "removeChild : none found?";
	}
	,__removeChild: function(child) {
		var i = this.getChildIndex(child);
		if(i >= 0) this.jeashChildren.splice(i,1);
	}
	,setChildIndex: function(child,index) {
		if(index > this.jeashChildren.length) throw "Invalid index position " + index;
		var s = null;
		var orig = this.getChildIndex(child);
		if(orig < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.jeashChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.jeashChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in jeashChildren array!";
			}
			throw msg;
		}
		if(index < orig) {
			var i = orig;
			while(i > index) {
				this.swapChildren(this.jeashChildren[i],this.jeashChildren[i - 1]);
				i--;
			}
		} else if(orig < index) {
			var i = orig;
			while(i < index) {
				this.swapChildren(this.jeashChildren[i],this.jeashChildren[i + 1]);
				i++;
			}
		}
	}
	,jeashSwapSurface: function(c1,c2) {
		if(this.jeashChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.jeashChildren.length;
		if(this.jeashChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.jeashChildren.length;
		var gfx1 = this.jeashChildren[c1].jeashGetGraphics();
		var gfx2 = this.jeashChildren[c2].jeashGetGraphics();
		if(gfx1 != null && gfx2 != null) jeash.Lib.jeashSwapSurface(gfx1.jeashSurface,gfx2.jeashSurface);
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i] == child1) c1 = i; else if(this.jeashChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.jeashChildren[c1];
			this.jeashChildren[c1] = this.jeashChildren[c2];
			this.jeashChildren[c2] = swap;
			swap = null;
			this.jeashSwapSurface(c1,c2);
		}
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null;
		var l = this.jeashChildren.length - 1;
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.jeashChildren[l - i].jeashGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return jeash.display.InteractiveObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,jeashSetFilters: function(filters) {
		jeash.display.InteractiveObject.prototype.jeashSetFilters.call(this,filters);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.jeashSetFilters(filters);
		}
		return filters;
	}
	,jeashSetVisible: function(visible) {
		jeash.display.InteractiveObject.prototype.jeashSetVisible.call(this,visible);
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i].jeashIsOnStage()) this.jeashChildren[i].jeashSetVisible(visible);
		}
		return visible;
	}
	,__class__: jeash.display.DisplayObjectContainer
	,__properties__: $extend(jeash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"jeashGetNumChildren"})
});
jeash.display.Sprite = function() {
	this.jeashGraphics = new jeash.display.Graphics();
	jeash.display.DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.name = "Sprite " + jeash.display.DisplayObject.mNameID++;
	jeash.Lib.jeashSetSurfaceId(this.jeashGraphics.jeashSurface,this.name);
};
$hxClasses["jeash.display.Sprite"] = jeash.display.Sprite;
jeash.display.Sprite.__name__ = ["jeash","display","Sprite"];
jeash.display.Sprite.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Sprite.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	jeashGraphics: null
	,graphics: null
	,useHandCursor: null
	,buttonMode: null
	,jeashCursorCallbackOver: null
	,jeashCursorCallbackOut: null
	,jeashDropTarget: null
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,jeashSetUseHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.jeashCursorCallbackOver != null) this.removeEventListener(jeash.events.MouseEvent.ROLL_OVER,this.jeashCursorCallbackOver);
		if(this.jeashCursorCallbackOut != null) this.removeEventListener(jeash.events.MouseEvent.ROLL_OUT,this.jeashCursorCallbackOut);
		if(!cursor) jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Default); else {
			this.jeashCursorCallbackOver = function(_) {
				jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Pointer);
			};
			this.jeashCursorCallbackOut = function(_) {
				jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Default);
			};
			this.addEventListener(jeash.events.MouseEvent.ROLL_OVER,this.jeashCursorCallbackOver);
			this.addEventListener(jeash.events.MouseEvent.ROLL_OUT,this.jeashCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,jeashGetDropTarget: function() {
		return this.jeashDropTarget;
	}
	,jeashSetX: function(n) {
		this.jeashInvalidateMatrix(true);
		this.jeashX = n;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		return n;
	}
	,jeashSetY: function(n) {
		this.jeashInvalidateMatrix(true);
		this.jeashY = n;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		return n;
	}
	,jeashSetScaleX: function(inS) {
		if(this.jeashScaleX == inS) return inS;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		this.jeashScaleX = inS;
		return inS;
	}
	,jeashSetScaleY: function(inS) {
		if(this.jeashScaleY == inS) return inS;
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		this.jeashScaleY = inS;
		return inS;
	}
	,jeashSetRotation: function(n) {
		if(!this.mMtxDirty) this.jeashInvalidateMatrix(true);
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		this.jeashRotation = n;
		return n;
	}
	,__class__: jeash.display.Sprite
	,__properties__: $extend(jeash.display.DisplayObjectContainer.prototype.__properties__,{set_useHandCursor:"jeashSetUseHandCursor",get_graphics:"jeashGetGraphics"})
});
var NMEPreloader = function() {
	jeash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new jeash.display.Sprite();
	this.outline.jeashGetGraphics().lineStyle(1,color,0.15,true);
	this.outline.jeashGetGraphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.jeashSetX(x);
	this.outline.jeashSetY(y);
	this.addChild(this.outline);
	this.progress = new jeash.display.Sprite();
	this.progress.jeashGetGraphics().beginFill(color,0.35);
	this.progress.jeashGetGraphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.jeashSetX(x + padding);
	this.progress.jeashSetY(y + padding);
	this.progress.jeashSetScaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = jeash.display.Sprite;
NMEPreloader.prototype = $extend(jeash.display.Sprite.prototype,{
	outline: null
	,progress: null
	,getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		return 720;
	}
	,getWidth: function() {
		return 1280;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new jeash.events.Event(jeash.events.Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.jeashSetScaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.prototype = {
	__class__: Reflect
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.prototype = {
	__class__: Std
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type.prototype = {
	__class__: Type
}
var Xml = function() { }
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.prototype = {
	nodeType: null
	,_nodeName: null
	,_nodeValue: null
	,_parent: null
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getParent: function() {
		return this._parent;
	}
	,__class__: Xml
}
var com = {}
com.nmeapp = {}
com.nmeapp.app = {}
com.nmeapp.app.Chara = function(stage,chara_type) {
	switch(chara_type) {
	case 0:
		this.m_test = new jeash.display.Bitmap(nme.installer.Assets.getBitmapData("graphics/standard/themes/theme0/tex_search_obj0.png"));
		break;
	case 1:
		this.m_test = new jeash.display.Bitmap(nme.installer.Assets.getBitmapData("graphics/standard/themes/theme0/tex_blue0.png"));
		break;
	case 2:
		this.m_test = new jeash.display.Bitmap(nme.installer.Assets.getBitmapData("graphics/standard/themes/theme0/tex_red0.png"));
		break;
	default:
		this.m_test = new jeash.display.Bitmap(nme.installer.Assets.getBitmapData("graphics/standard/themes/theme0/tex_search_obj0.png"));
	}
	stage.addChild(this.m_test);
	this.m_vflag = false;
	this.m_hflag = false;
};
$hxClasses["com.nmeapp.app.Chara"] = com.nmeapp.app.Chara;
com.nmeapp.app.Chara.__name__ = ["com","nmeapp","app","Chara"];
com.nmeapp.app.Chara.prototype = {
	m_test: null
	,m_vflag: null
	,m_hflag: null
	,update: function(delta_time) {
		var stage = jeash.Lib.jeashGetCurrent().GetStage();
		var speed = 300.0 * delta_time;
		var rotate_speed = 360 * delta_time;
		if(!this.m_hflag) {
			var _g = this.m_test;
			_g.jeashSetX(_g.jeashGetX() + speed);
			if(this.m_test.jeashGetX() + 64 > stage.jeashGetStageWidth()) this.m_hflag = true;
		} else {
			var _g = this.m_test;
			_g.jeashSetX(_g.jeashGetX() - speed);
			if(this.m_test.jeashGetX() < 0) this.m_hflag = false;
		}
		if(!this.m_vflag) {
			var _g = this.m_test;
			_g.jeashSetY(_g.jeashGetY() + speed);
			if(this.m_test.jeashGetY() + 64 > stage.jeashGetStageHeight()) this.m_vflag = true;
		} else {
			var _g = this.m_test;
			_g.jeashSetY(_g.jeashGetY() - speed);
			if(this.m_test.jeashGetY() < 0) this.m_vflag = false;
		}
		var _g = this.m_test;
		_g.jeashSetRotation(_g.jeashGetRotation() + rotate_speed);
	}
	,__class__: com.nmeapp.app.Chara
}
com.nmeapp.app.Main = function() {
	jeash.display.Sprite.call(this);
	this.addEventListener(jeash.events.Event.ADDED_TO_STAGE,this.appInit.$bind(this));
};
$hxClasses["com.nmeapp.app.Main"] = com.nmeapp.app.Main;
com.nmeapp.app.Main.__name__ = ["com","nmeapp","app","Main"];
com.nmeapp.app.Main.__super__ = jeash.display.Sprite;
com.nmeapp.app.Main.prototype = $extend(jeash.display.Sprite.prototype,{
	m_fps: null
	,m_last_time_stamp: null
	,m_delta_time: null
	,m_font: null
	,m_text_format: null
	,m_text_field: null
	,m_rect: null
	,m_bgm: null
	,m_se1: null
	,m_se2: null
	,m_chara_array: null
	,m_counter: null
	,m_chara_type: null
	,appInit: function(event) {
		this.m_fps = new nme.display.FPS(10.0,10.0,16777215);
		this.m_fps.jeashSetScaleX(2.0);
		this.m_fps.jeashSetScaleY(2.0);
		this.addChild(this.m_fps);
		this.m_last_time_stamp = haxe.Timer.stamp();
		this.m_font = nme.installer.Assets.getFont("font/yutapon_coding_081.ttf");
		this.m_text_format = new jeash.text.TextFormat(this.m_font.fontName,24,16777215);
		this.m_text_field = new jeash.text.TextField();
		this.m_text_field.jeashSetDefaultTextFormat(this.m_text_format);
		this.m_text_field.selectable = false;
		this.m_text_field.embedFonts = true;
		this.m_text_field.jeashSetWidth(250);
		this.m_text_field.jeashSetHeight(40);
		this.m_text_field.jeashSetX(10);
		this.m_text_field.jeashSetY(35);
		this.m_text_field.SetText("ObjectCount::");
		this.addChild(this.m_text_field);
		this.m_rect = new jeash.display.Sprite();
		this.m_rect.jeashSetX(5);
		this.m_rect.jeashSetY(7);
		this.m_rect.alpha = 0.8;
		this.m_rect.jeashGetGraphics().beginFill(4473924);
		this.m_rect.jeashGetGraphics().drawRect(0,0,260,60);
		this.m_rect.jeashGetGraphics().endFill();
		this.addChild(this.m_rect);
		this.m_bgm = nme.installer.Assets.getSound("bgm/bgm000.mp3");
		this.m_se1 = nme.installer.Assets.getSound("se/coin.wav");
		this.m_se2 = nme.installer.Assets.getSound("se/jump.wav");
		this.m_chara_array = new Array();
		this.m_counter = 0;
		this.m_chara_type = 0;
		this.GetStage().addEventListener(jeash.events.MouseEvent.MOUSE_DOWN,this.appMouseClick.$bind(this));
		this.addEventListener(jeash.events.Event.ENTER_FRAME,this.appLoop.$bind(this));
	}
	,appLoop: function(event) {
		var old_stamp = this.m_last_time_stamp;
		this.m_last_time_stamp = haxe.Timer.stamp();
		this.m_delta_time = this.m_last_time_stamp - old_stamp;
		if(this.m_delta_time >= 0.15) this.m_delta_time = 0.15;
		this.m_counter += this.m_delta_time;
		if(this.m_counter >= 0.175) {
			this.m_chara_array.push(new com.nmeapp.app.Chara(this,this.m_chara_type));
			this.m_chara_type = (this.m_chara_type + 1) % 3;
			this.m_counter -= 0.175;
		}
		var _g1 = 0, _g = this.m_chara_array.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_chara_array[i].update(this.m_delta_time);
		}
		this.m_text_field.SetText("ObjectCount::" + this.m_chara_array.length);
		this.removeChild(this.m_rect);
		this.addChild(this.m_rect);
		this.removeChild(this.m_fps);
		this.addChild(this.m_fps);
		this.removeChild(this.m_text_field);
		this.addChild(this.m_text_field);
	}
	,appMouseClick: function(event) {
		this.playTestSe();
	}
	,playTestSe: function() {
	}
	,__class__: com.nmeapp.app.Main
});
var haxe = {}
haxe.Log = function() { }
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.content = null;
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe.Resource.prototype = {
	__class__: haxe.Resource
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Timer = function() { }
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype = {
	__class__: haxe.Timer
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.cca(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.cca(this.pos) == 103) break;
			var k = this.unserialize();
			if(!Std["is"](k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.cca(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = this.buf.substr(this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.cca(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.cca(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = Date.fromString(this.buf.substr(this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.cca(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Input = function() { }
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	bigEndian: null
	,setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"setEndian"}
}
haxe.xml = {}
haxe.xml.Filter = $hxClasses["haxe.xml.Filter"] = { __ename__ : ["haxe","xml","Filter"], __constructs__ : ["FInt","FBool","FEnum","FReg"] }
haxe.xml.Filter.FInt = ["FInt",0];
haxe.xml.Filter.FInt.toString = $estr;
haxe.xml.Filter.FInt.__enum__ = haxe.xml.Filter;
haxe.xml.Filter.FBool = ["FBool",1];
haxe.xml.Filter.FBool.toString = $estr;
haxe.xml.Filter.FBool.__enum__ = haxe.xml.Filter;
haxe.xml.Filter.FEnum = function(values) { var $x = ["FEnum",2,values]; $x.__enum__ = haxe.xml.Filter; $x.toString = $estr; return $x; }
haxe.xml.Filter.FReg = function(matcher) { var $x = ["FReg",3,matcher]; $x.__enum__ = haxe.xml.Filter; $x.toString = $estr; return $x; }
haxe.xml.Attrib = $hxClasses["haxe.xml.Attrib"] = { __ename__ : ["haxe","xml","Attrib"], __constructs__ : ["Att"] }
haxe.xml.Attrib.Att = function(name,filter,defvalue) { var $x = ["Att",0,name,filter,defvalue]; $x.__enum__ = haxe.xml.Attrib; $x.toString = $estr; return $x; }
haxe.xml.Rule = $hxClasses["haxe.xml.Rule"] = { __ename__ : ["haxe","xml","Rule"], __constructs__ : ["RNode","RData","RMulti","RList","RChoice","ROptional"] }
haxe.xml.Rule.RNode = function(name,attribs,childs) { var $x = ["RNode",0,name,attribs,childs]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml.Rule.RData = function(filter) { var $x = ["RData",1,filter]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml.Rule.RMulti = function(rule,atLeastOne) { var $x = ["RMulti",2,rule,atLeastOne]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml.Rule.RList = function(rules,ordered) { var $x = ["RList",3,rules,ordered]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml.Rule.RChoice = function(choices) { var $x = ["RChoice",4,choices]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml.Rule.ROptional = function(rule) { var $x = ["ROptional",5,rule]; $x.__enum__ = haxe.xml.Rule; $x.toString = $estr; return $x; }
haxe.xml._Check = {}
haxe.xml._Check.CheckResult = $hxClasses["haxe.xml._Check.CheckResult"] = { __ename__ : ["haxe","xml","_Check","CheckResult"], __constructs__ : ["CMatch","CMissing","CExtra","CElementExpected","CDataExpected","CExtraAttrib","CMissingAttrib","CInvalidAttrib","CInvalidData","CInElement"] }
haxe.xml._Check.CheckResult.CMatch = ["CMatch",0];
haxe.xml._Check.CheckResult.CMatch.toString = $estr;
haxe.xml._Check.CheckResult.CMatch.__enum__ = haxe.xml._Check.CheckResult;
haxe.xml._Check.CheckResult.CMissing = function(r) { var $x = ["CMissing",1,r]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CExtra = function(x) { var $x = ["CExtra",2,x]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CElementExpected = function(name,x) { var $x = ["CElementExpected",3,name,x]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CDataExpected = function(x) { var $x = ["CDataExpected",4,x]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CExtraAttrib = function(att,x) { var $x = ["CExtraAttrib",5,att,x]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CMissingAttrib = function(att,x) { var $x = ["CMissingAttrib",6,att,x]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CInvalidAttrib = function(att,x,f) { var $x = ["CInvalidAttrib",7,att,x,f]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CInvalidData = function(x,f) { var $x = ["CInvalidData",8,x,f]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
haxe.xml._Check.CheckResult.CInElement = function(x,r) { var $x = ["CInElement",9,x,r]; $x.__enum__ = haxe.xml._Check.CheckResult; $x.toString = $estr; return $x; }
jeash.Lib = function(title,width,height) {
	this.mKilled = false;
	this.__scr = js.Lib.document.getElementById(title);
	if(this.__scr == null) throw "Element with id '" + title + "' not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	this.__scr.style.width = width + "px";
	this.__scr.style.height = height + "px";
};
$hxClasses["jeash.Lib"] = jeash.Lib;
jeash.Lib.__name__ = ["jeash","Lib"];
jeash.Lib.__properties__ = {get_current:"jeashGetCurrent"}
jeash.Lib.mMe = null;
jeash.Lib.current = null;
jeash.Lib.mStage = null;
jeash.Lib.mMainClassRoot = null;
jeash.Lib.mCurrent = null;
jeash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
jeash.Lib.jeashGetCurrent = function() {
	if(jeash.Lib.mMainClassRoot == null) {
		jeash.Lib.mMainClassRoot = new jeash.display.MovieClip();
		jeash.Lib.mCurrent = jeash.Lib.mMainClassRoot;
		jeash.Lib.mCurrent.name = "Root MovieClip";
		jeash.Lib.jeashGetStage().addChild(jeash.Lib.mCurrent);
	}
	return jeash.Lib.mMainClassRoot;
}
jeash.Lib.jeashGetStage = function() {
	if(jeash.Lib.mStage == null) {
		var width = jeash.Lib.jeashGetWidth();
		var height = jeash.Lib.jeashGetHeight();
		jeash.Lib.mStage = new jeash.display.Stage(width,height);
	}
	return jeash.Lib.mStage;
}
jeash.Lib.jeashAppendSurface = function(surface,before) {
	if(jeash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) jeash.Lib.mMe.__scr.insertBefore(surface,before); else jeash.Lib.mMe.__scr.appendChild(surface);
	}
}
jeash.Lib.jeashSwapSurface = function(surface1,surface2) {
	var c1 = -1;
	var c2 = -1;
	var swap;
	var _g1 = 0, _g = jeash.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(jeash.Lib.mMe.__scr.childNodes[i] == surface1) c1 = i; else if(jeash.Lib.mMe.__scr.childNodes[i] == surface2) c2 = i;
	}
	if(c1 != -1 && c2 != -1) {
		swap = jeash.Lib.jeashRemoveSurface(jeash.Lib.mMe.__scr.childNodes[c1]);
		if(c2 > c1) c2--;
		if(c2 < jeash.Lib.mMe.__scr.childNodes.length - 1) jeash.Lib.mMe.__scr.insertBefore(swap,jeash.Lib.mMe.__scr.childNodes[c2++]); else jeash.Lib.mMe.__scr.appendChild(swap);
		swap = jeash.Lib.jeashRemoveSurface(jeash.Lib.mMe.__scr.childNodes[c2]);
		if(c1 > c2) c1--;
		if(c1 < jeash.Lib.mMe.__scr.childNodes.length - 1) jeash.Lib.mMe.__scr.insertBefore(swap,jeash.Lib.mMe.__scr.childNodes[c1++]); else jeash.Lib.mMe.__scr.appendChild(swap);
	}
}
jeash.Lib.jeashIsOnStage = function(surface) {
	var _g1 = 0, _g = jeash.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(jeash.Lib.mMe.__scr.childNodes[i] == surface) return true;
	}
	return false;
}
jeash.Lib.jeashRemoveSurface = function(surface) {
	if(jeash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-jeash-anim");
		if(anim != null) {
			var style = js.Lib.document.getElementById(anim);
			if(style != null) jeash.Lib.mMe.__scr.removeChild(style);
		}
		jeash.Lib.mMe.__scr.removeChild(surface);
	}
	return surface;
}
jeash.Lib.jeashSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-jeash-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("-moz-transform",matrix.toMozString(),"");
		surface.style.setProperty("-webkit-transform",matrix.toString(),"");
		surface.style.setProperty("-o-transform",matrix.toString(),"");
		surface.style.setProperty("-ms-transform",matrix.toString(),"");
	}
}
jeash.Lib.jeashSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
jeash.Lib.jeashSetContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
jeash.Lib.jeashCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
jeash.Lib.jeashDrawToSurface = function(surface,tgt,matrix,alpha,clipRect) {
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	if(alpha != 1.0) tgtCtx.globalAlpha = alpha;
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			jeash.Lib.jeashDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else jeash.Lib.jeashDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
jeash.Lib.jeashDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
jeash.Lib.jeashDisableRightClick = function() {
	if(jeash.Lib.mMe != null) try {
		jeash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		jeash.Lib.trace("Disable right click not supported in this browser.");
	}
}
jeash.Lib.jeashEnableRightClick = function() {
	if(jeash.Lib.mMe != null) try {
		jeash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
	}
}
jeash.Lib.jeashEnableFullScreen = function() {
	if(jeash.Lib.mMe != null) {
		var origWidth = jeash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = jeash.Lib.mMe.__scr.style.getPropertyValue("height");
		jeash.Lib.mMe.__scr.style.setProperty("width","100%","");
		jeash.Lib.mMe.__scr.style.setProperty("height","100%","");
		jeash.Lib.jeashDisableFullScreen = function() {
			jeash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			jeash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
jeash.Lib.jeashDisableFullScreen = function() {
}
jeash.Lib.jeashFullScreenWidth = function() {
	var window = js.Lib.window;
	return window.innerWidth;
}
jeash.Lib.jeashFullScreenHeight = function() {
	var window = js.Lib.window;
	return window.innerHeight;
}
jeash.Lib.jeashSetCursor = function(type) {
	if(jeash.Lib.mMe != null) jeash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
jeash.Lib.jeashSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
jeash.Lib.jeashSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
jeash.Lib.Run = function(tgt,width,height) {
	jeash.Lib.mMe = new jeash.Lib(tgt.id,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) switch(attr.name) {
		case "data-" + "framerate":
			jeash.Lib.jeashGetStage().jeashSetFrameRate(Std.parseFloat(attr.value));
			break;
		default:
		}
	}
	var _g = 0, _g1 = jeash.Lib.HTML_TOUCH_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$_.jeashQueueStageEvent.$bind($_)),true);
	}
	var _g = 0, _g1 = jeash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$_.jeashQueueStageEvent.$bind($_)),true);
	}
	var window = js.Lib.window;
	var _g = 0, _g1 = jeash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		window.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$_.jeashQueueStageEvent.$bind($_)),false);
	}
	jeash.Lib.jeashGetStage().jeashSetBackgroundColour(tgt.style.backgroundColor != null && tgt.style.backgroundColor != ""?jeash.Lib.jeashParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return (function($this) {
			var $r;
			switch(pos) {
			case 0:
				$r = res | cur << 16;
				break;
			case 1:
				$r = res | cur << 8;
				break;
			case 2:
				$r = res | cur;
				break;
			}
			return $r;
		}(this));
	}):16777215);
	jeash.Lib.jeashGetCurrent().jeashGetGraphics().beginFill(jeash.Lib.jeashGetStage().jeashGetBackgroundColour());
	jeash.Lib.jeashGetCurrent().jeashGetGraphics().drawRect(0,0,width,height);
	jeash.Lib.jeashSetSurfaceId(jeash.Lib.jeashGetCurrent().jeashGetGraphics().jeashSurface,"Root MovieClip");
	jeash.Lib.jeashGetStage().jeashUpdateNextWake();
	return jeash.Lib.mMe;
}
jeash.Lib.jeashParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
jeash.Lib.jeashGetWidth = function() {
	var tgt = jeash.Lib.mMe != null?jeash.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt.clientWidth > 0?tgt.clientWidth:500;
}
jeash.Lib.jeashGetHeight = function() {
	var tgt = jeash.Lib.mMe != null?jeash.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt.clientHeight > 0?tgt.clientHeight:500;
}
jeash.Lib.jeashBootstrap = function() {
	if(jeash.Lib.mMe == null) {
		var tgt = js.Lib.document.getElementById("haxe:jeash");
		jeash.Lib.Run(tgt,jeash.Lib.jeashGetWidth(),jeash.Lib.jeashGetHeight());
	}
}
jeash.Lib.prototype = {
	mKilled: null
	,__scr: null
	,__class__: jeash.Lib
}
jeash._Lib = {}
jeash._Lib.CursorType = $hxClasses["jeash._Lib.CursorType"] = { __ename__ : ["jeash","_Lib","CursorType"], __constructs__ : ["Pointer","Text","Default"] }
jeash._Lib.CursorType.Pointer = ["Pointer",0];
jeash._Lib.CursorType.Pointer.toString = $estr;
jeash._Lib.CursorType.Pointer.__enum__ = jeash._Lib.CursorType;
jeash._Lib.CursorType.Text = ["Text",1];
jeash._Lib.CursorType.Text.toString = $estr;
jeash._Lib.CursorType.Text.__enum__ = jeash._Lib.CursorType;
jeash._Lib.CursorType.Default = ["Default",2];
jeash._Lib.CursorType.Default.toString = $estr;
jeash._Lib.CursorType.Default.__enum__ = jeash._Lib.CursorType;
jeash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	jeash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	this.name = "Bitmap_" + jeash.display.DisplayObject.mNameID++;
	this.jeashGraphics = new jeash.display.Graphics();
	jeash.Lib.jeashSetSurfaceId(this.jeashGraphics.jeashSurface,this.name);
	if(inBitmapData != null) {
		this.jeashSetBitmapData(inBitmapData);
		this.jeashRender(null,null);
	}
};
$hxClasses["jeash.display.Bitmap"] = jeash.display.Bitmap;
jeash.display.Bitmap.__name__ = ["jeash","display","Bitmap"];
jeash.display.Bitmap.__super__ = jeash.display.DisplayObject;
jeash.display.Bitmap.prototype = $extend(jeash.display.DisplayObject.prototype,{
	bitmapData: null
	,pixelSnapping: null
	,smoothing: null
	,jeashGraphics: null
	,jeashCurrentLease: null
	,jeashSetBitmapData: function(inBitmapData) {
		this.jeashInvalidateBounds();
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,BuildBounds: function() {
		jeash.display.DisplayObject.prototype.BuildBounds.call(this);
		if(this.bitmapData != null) {
			var r = new jeash.geom.Rectangle(0,0,this.bitmapData.getWidth(),this.bitmapData.getHeight());
			if(r.width != 0 || r.height != 0) {
				if(this.mBoundsRect.width == 0 && this.mBoundsRect.height == 0) this.mBoundsRect = r.clone(); else this.mBoundsRect.extendBounds(r);
			}
		}
	}
	,jeashApplyFilters: function(surface) {
		if(this.jeashFilters != null) {
			var _g = 0, _g1 = this.jeashFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.jeashApplyFilter(this.jeashGraphics.jeashSurface);
			}
		}
	}
	,jeashRender: function(inMatrix,inMask,clipRect) {
		if(this.bitmapData == null) return;
		if(this.mMtxDirty || this.mMtxChainDirty) this.jeashValidateMatrix();
		var m = inMatrix != null?inMatrix:this.mFullMatrix.clone();
		var imageDataLease = this.bitmapData.jeashLease;
		if(imageDataLease != null && (this.jeashCurrentLease == null || imageDataLease.seed != this.jeashCurrentLease.seed || imageDataLease.time != this.jeashCurrentLease.time)) {
			var srcCanvas = this.bitmapData.mTextureBuffer;
			this.jeashGraphics.jeashSurface.width = srcCanvas.width;
			this.jeashGraphics.jeashSurface.height = srcCanvas.height;
			this.jeashGraphics.clear();
			jeash.Lib.jeashDrawToSurface(srcCanvas,this.jeashGraphics.jeashSurface);
			this.jeashCurrentLease = imageDataLease.clone();
			this.jeashApplyFilters(this.jeashGraphics.jeashSurface);
		} else if(inMask != null) this.jeashApplyFilters(this.jeashGraphics.jeashSurface);
		if(inMask != null) jeash.Lib.jeashDrawToSurface(this.jeashGraphics.jeashSurface,inMask,m,(this.parent != null?this.parent.alpha:1) * this.alpha,clipRect); else {
			jeash.Lib.jeashSetSurfaceTransform(this.jeashGraphics.jeashSurface,m);
			jeash.Lib.jeashSetSurfaceOpacity(this.jeashGraphics.jeashSurface,(this.parent != null?this.parent.alpha:1) * this.alpha);
		}
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.jeashGetWidth() || local.y > this.jeashGetHeight()) return null; else return this;
		} else return jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,__class__: jeash.display.Bitmap
	,__properties__: $extend(jeash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"jeashSetBitmapData"})
});
jeash.display.ImageDataLease = function() {
};
$hxClasses["jeash.display.ImageDataLease"] = jeash.display.ImageDataLease;
jeash.display.ImageDataLease.__name__ = ["jeash","display","ImageDataLease"];
jeash.display.ImageDataLease.prototype = {
	seed: null
	,time: null
	,set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new jeash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: jeash.display.ImageDataLease
}
jeash.display.BitmapData = function(inWidth,inHeight,inTransparent,inFillColor) {
	if(inTransparent == null) inTransparent = true;
	this.jeashLocked = false;
	this.jeashLeaseNum = 0;
	this.jeashLease = new jeash.display.ImageDataLease();
	this.jeashLease.set(this.jeashLeaseNum++,Date.now().getTime());
	this.mTextureBuffer = js.Lib.document.createElement("canvas");
	this.mTextureBuffer.width = inWidth;
	this.mTextureBuffer.height = inHeight;
	jeash.Lib.jeashSetSurfaceId(this.mTextureBuffer,"BitmapData " + jeash.display.BitmapData.mNameID++);
	this.jeashTransparent = inTransparent;
	this.rect = new jeash.geom.Rectangle(0,0,inWidth,inHeight);
	if(this.jeashTransparent) {
		this.jeashTransparentFiller = js.Lib.document.createElement("canvas");
		this.jeashTransparentFiller.width = inWidth;
		this.jeashTransparentFiller.height = inHeight;
		var ctx = this.jeashTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null) {
		if(!this.jeashTransparent) inFillColor |= -16777216;
		this.jeashInitColor = inFillColor;
		this.jeashFillRect(this.rect,inFillColor);
	}
};
$hxClasses["jeash.display.BitmapData"] = jeash.display.BitmapData;
jeash.display.BitmapData.__name__ = ["jeash","display","BitmapData"];
jeash.display.BitmapData.__interfaces__ = [jeash.display.IBitmapDrawable];
jeash.display.BitmapData.prototype = {
	mTextureBuffer: null
	,jeashTransparent: null
	,width: null
	,height: null
	,rect: null
	,jeashImageData: null
	,jeashImageDataChanged: null
	,jeashLocked: null
	,jeashLease: null
	,jeashLeaseNum: null
	,jeashInitColor: null
	,jeashTransparentFiller: null
	,jeashFillRect: function(rect,color) {
		this.jeashLease.set(this.jeashLeaseNum++,Date.now().getTime());
		var ctx = this.mTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.jeashTransparent?color >>> 24:255;
		if(!this.jeashLocked) {
			if(this.jeashTransparent) {
				var trpCtx = this.jeashTransparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(rect.x,rect.y,rect.width,rect.height);
				ctx.putImageData(trpData,rect.x,rect.y);
			}
			var style = "rgba(";
			style += r;
			style += ", ";
			style += g;
			style += ", ";
			style += b;
			style += ", ";
			style += a / 256;
			style += ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.jeashImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.jeashImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.jeashImageData.data[s + offsetX] = r;
					this.jeashImageData.data[s + offsetX + 1] = g;
					this.jeashImageData.data[s + offsetX + 2] = b;
					this.jeashImageData.data[s + offsetX + 3] = a;
				}
			}
			this.jeashImageDataChanged = true;
			ctx.putImageData(this.jeashImageData,0,0,rect.x,rect.y,rect.width,rect.height);
		}
	}
	,handle: function() {
		return this.mTextureBuffer;
	}
	,getWidth: function() {
		if(this.mTextureBuffer != null) return this.mTextureBuffer.width; else return 0;
	}
	,getHeight: function() {
		if(this.mTextureBuffer != null) return this.mTextureBuffer.height; else return 0;
	}
	,jeashOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new jeash.geom.Rectangle(0,0,width,height);
		data.bitmapData.jeashBuildLease();
		if(data.inLoader != null) {
			var e1 = new jeash.events.Event(jeash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,jeashLoadFromFile: function(inFilename,inLoader) {
		var me = this;
		var image = js.Lib.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.mTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(a2) {
					return f(a1,a2);
				};
			})(this.jeashOnLoad.$bind(this),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) me.jeashOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
	}
	,drawToSurface: function(inSurface,matrix,colorTransform,blendMode,clipRect,smothing) {
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			ctx.restore();
		}
		this.jeashLease.set(this.jeashLeaseNum++,Date.now().getTime());
		ctx.drawImage(this.mTextureBuffer,0,0);
	}
	,jeashGetLease: function() {
		return this.jeashLease;
	}
	,jeashBuildLease: function() {
		this.jeashLease.set(this.jeashLeaseNum++,Date.now().getTime());
	}
	,__class__: jeash.display.BitmapData
	,__properties__: {get_height:"getHeight",get_width:"getWidth"}
}
jeash.display.BlendMode = $hxClasses["jeash.display.BlendMode"] = { __ename__ : ["jeash","display","BlendMode"], __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
jeash.display.BlendMode.ADD = ["ADD",0];
jeash.display.BlendMode.ADD.toString = $estr;
jeash.display.BlendMode.ADD.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.ALPHA = ["ALPHA",1];
jeash.display.BlendMode.ALPHA.toString = $estr;
jeash.display.BlendMode.ALPHA.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.DARKEN = ["DARKEN",2];
jeash.display.BlendMode.DARKEN.toString = $estr;
jeash.display.BlendMode.DARKEN.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
jeash.display.BlendMode.DIFFERENCE.toString = $estr;
jeash.display.BlendMode.DIFFERENCE.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.ERASE = ["ERASE",4];
jeash.display.BlendMode.ERASE.toString = $estr;
jeash.display.BlendMode.ERASE.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
jeash.display.BlendMode.HARDLIGHT.toString = $estr;
jeash.display.BlendMode.HARDLIGHT.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.INVERT = ["INVERT",6];
jeash.display.BlendMode.INVERT.toString = $estr;
jeash.display.BlendMode.INVERT.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.LAYER = ["LAYER",7];
jeash.display.BlendMode.LAYER.toString = $estr;
jeash.display.BlendMode.LAYER.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
jeash.display.BlendMode.LIGHTEN.toString = $estr;
jeash.display.BlendMode.LIGHTEN.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
jeash.display.BlendMode.MULTIPLY.toString = $estr;
jeash.display.BlendMode.MULTIPLY.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.NORMAL = ["NORMAL",10];
jeash.display.BlendMode.NORMAL.toString = $estr;
jeash.display.BlendMode.NORMAL.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.OVERLAY = ["OVERLAY",11];
jeash.display.BlendMode.OVERLAY.toString = $estr;
jeash.display.BlendMode.OVERLAY.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.SCREEN = ["SCREEN",12];
jeash.display.BlendMode.SCREEN.toString = $estr;
jeash.display.BlendMode.SCREEN.__enum__ = jeash.display.BlendMode;
jeash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
jeash.display.BlendMode.SUBTRACT.toString = $estr;
jeash.display.BlendMode.SUBTRACT.__enum__ = jeash.display.BlendMode;
jeash.display.CapsStyle = $hxClasses["jeash.display.CapsStyle"] = { __ename__ : ["jeash","display","CapsStyle"], __constructs__ : ["NONE","ROUND","SQUARE"] }
jeash.display.CapsStyle.NONE = ["NONE",0];
jeash.display.CapsStyle.NONE.toString = $estr;
jeash.display.CapsStyle.NONE.__enum__ = jeash.display.CapsStyle;
jeash.display.CapsStyle.ROUND = ["ROUND",1];
jeash.display.CapsStyle.ROUND.toString = $estr;
jeash.display.CapsStyle.ROUND.__enum__ = jeash.display.CapsStyle;
jeash.display.CapsStyle.SQUARE = ["SQUARE",2];
jeash.display.CapsStyle.SQUARE.toString = $estr;
jeash.display.CapsStyle.SQUARE.__enum__ = jeash.display.CapsStyle;
jeash.display.GradientType = $hxClasses["jeash.display.GradientType"] = { __ename__ : ["jeash","display","GradientType"], __constructs__ : ["RADIAL","LINEAR"] }
jeash.display.GradientType.RADIAL = ["RADIAL",0];
jeash.display.GradientType.RADIAL.toString = $estr;
jeash.display.GradientType.RADIAL.__enum__ = jeash.display.GradientType;
jeash.display.GradientType.LINEAR = ["LINEAR",1];
jeash.display.GradientType.LINEAR.toString = $estr;
jeash.display.GradientType.LINEAR.__enum__ = jeash.display.GradientType;
jeash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["jeash.display.GfxPoint"] = jeash.display.GfxPoint;
jeash.display.GfxPoint.__name__ = ["jeash","display","GfxPoint"];
jeash.display.GfxPoint.prototype = {
	x: null
	,y: null
	,cx: null
	,cy: null
	,type: null
	,__class__: jeash.display.GfxPoint
}
jeash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["jeash.display.LineJob"] = jeash.display.LineJob;
jeash.display.LineJob.__name__ = ["jeash","display","LineJob"];
jeash.display.LineJob.prototype = {
	grad: null
	,point_idx0: null
	,point_idx1: null
	,thickness: null
	,alpha: null
	,colour: null
	,pixel_hinting: null
	,joints: null
	,caps: null
	,scale_mode: null
	,miter_limit: null
	,__class__: jeash.display.LineJob
}
jeash.display.PointInPathMode = $hxClasses["jeash.display.PointInPathMode"] = { __ename__ : ["jeash","display","PointInPathMode"], __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
jeash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
jeash.display.PointInPathMode.USER_SPACE.toString = $estr;
jeash.display.PointInPathMode.USER_SPACE.__enum__ = jeash.display.PointInPathMode;
jeash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
jeash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
jeash.display.PointInPathMode.DEVICE_SPACE.__enum__ = jeash.display.PointInPathMode;
jeash.display.Graphics = function(inSurface) {
	jeash.Lib.jeashBootstrap();
	if(inSurface == null) {
		this.jeashSurface = js.Lib.document.createElement("canvas");
		this.jeashSurface.width = 0;
		this.jeashSurface.height = 0;
	} else this.jeashSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.jeashClearLine();
	this.mLineJobs = [];
	this.jeashChanged = true;
	this.nextDrawIndex = 0;
	this.jeashExtent = new jeash.geom.Rectangle();
	this.jeashClearNextCycle = true;
};
$hxClasses["jeash.display.Graphics"] = jeash.display.Graphics;
jeash.display.Graphics.__name__ = ["jeash","display","Graphics"];
jeash.display.Graphics.jeashDetectIsPointInPathMode = function() {
	var canvas = js.Lib.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return jeash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?jeash.display.PointInPathMode.USER_SPACE:jeash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
jeash.display.Graphics.prototype = {
	jeashSurface: null
	,jeashChanged: null
	,mPoints: null
	,mFilling: null
	,mFillColour: null
	,mFillAlpha: null
	,mSolidGradient: null
	,mBitmap: null
	,mCurrentLine: null
	,mLineJobs: null
	,mDrawList: null
	,mPenX: null
	,mPenY: null
	,mLastMoveID: null
	,jeashExtent: null
	,nextDrawIndex: null
	,jeashClearNextCycle: null
	,createCanvasColor: function(color,alpha) {
		var r;
		var g;
		var b;
		r = (16711680 & color) >> 16;
		g = (65280 & color) >> 8;
		b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new jeash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new jeash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new jeash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new jeash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,jeashRender: function(maskHandle,matrix) {
		if(!this.jeashChanged) return false;
		this.ClosePolygon(true);
		if(this.jeashExtent.width - this.jeashExtent.x > this.jeashSurface.width || this.jeashExtent.height - this.jeashExtent.y > this.jeashSurface.height) this.jeashAdjustSurface();
		if(this.jeashClearNextCycle) {
			this.jeashClearCanvas();
			this.jeashClearNextCycle = false;
		}
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.jeashSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		var len = this.mDrawList.length;
		ctx.save();
		if(this.jeashExtent.x != 0 || this.jeashExtent.y != 0) ctx.translate(-this.jeashExtent.x,-this.jeashExtent.y);
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.lineJobs.length > 0) {
				var _g1 = 0, _g2 = d.lineJobs;
				while(_g1 < _g2.length) {
					var lj = _g2[_g1];
					++_g1;
					ctx.lineWidth = lj.thickness;
					switch(lj.joints) {
					case 0:
						ctx.lineJoin = "round";
						break;
					case 4096:
						ctx.lineJoin = "miter";
						break;
					case 8192:
						ctx.lineJoin = "bevel";
						break;
					}
					switch(lj.caps) {
					case 256:
						ctx.lineCap = "round";
						break;
					case 512:
						ctx.lineCap = "square";
						break;
					case 0:
						ctx.lineCap = "butt";
						break;
					}
					ctx.miterLimit = lj.miter_limit;
					if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
					ctx.beginPath();
					var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
					while(_g4 < _g3) {
						var i1 = _g4++;
						var p = d.points[i1];
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
					ctx.stroke();
				}
			} else {
				ctx.beginPath();
				var _g1 = 0, _g2 = d.points;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					switch(p.type) {
					case 0:
						ctx.moveTo(p.x,p.y);
						break;
					case 2:
						ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
						break;
					default:
						ctx.lineTo(p.x,p.y);
					}
				}
				ctx.closePath();
			}
			var fillColour = d.fillColour;
			var fillAlpha = d.fillAlpha;
			if(fillAlpha >= 0. && fillAlpha <= 1.) {
				var g = d.solidGradient;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else ctx.fillStyle = this.createCanvasColor(fillColour,fillAlpha);
			}
			ctx.fill();
			ctx.save();
			var bitmap = d.bitmap;
			if(bitmap != null) {
				ctx.clip();
				if(this.jeashExtent.x != 0 || this.jeashExtent.y != 0) ctx.translate(-this.jeashExtent.x,-this.jeashExtent.y);
				var img = bitmap.texture_buffer;
				var matrix1 = bitmap.matrix;
				if(matrix1 != null) ctx.transform(matrix1.a,matrix1.b,matrix1.c,matrix1.d,matrix1.tx,matrix1.ty);
				ctx.drawImage(img,0,0);
			}
			ctx.restore();
		}
		ctx.restore();
		this.jeashChanged = false;
		this.nextDrawIndex = len;
		return true;
	}
	,jeashHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.jeashSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		ctx.save();
		var _g = 0, _g1 = this.mDrawList;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			ctx.beginPath();
			var _g2 = 0, _g3 = d.points;
			while(_g2 < _g3.length) {
				var p = _g3[_g2];
				++_g2;
				switch(p.type) {
				case 0:
					ctx.moveTo(p.x,p.y);
					break;
				case 2:
					ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
					break;
				default:
					ctx.lineTo(p.x,p.y);
				}
			}
			ctx.closePath();
			if(ctx.isPointInPath(inX,inY)) return true;
		}
		ctx.restore();
		return false;
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.AddLineSegment();
		if(thickness == null) {
			this.jeashClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,beginFill: function(color,alpha) {
		this.ClosePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,endFill: function() {
		this.ClosePolygon(true);
	}
	,drawRect: function(x,y,width,height) {
		this.ClosePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.ClosePolygon(false);
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.ClosePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.ClosePolygon(false);
	}
	,jeashClearLine: function() {
		this.mCurrentLine = new jeash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,jeashClearCanvas: function() {
		if(this.jeashSurface != null) {
			var w = this.jeashSurface.width;
			this.jeashSurface.width = w;
		}
	}
	,clear: function() {
		this.jeashClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.jeashClearNextCycle = true;
		this.mLineJobs = [];
	}
	,jeashExpandStandardExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.jeashExtent.x;
		minY = this.jeashExtent.y;
		maxX = this.jeashExtent.width + minX;
		maxY = this.jeashExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.jeashExtent.x = minX;
		this.jeashExtent.y = minY;
		this.jeashExtent.width = maxX - minX;
		this.jeashExtent.height = maxY - minY;
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.ClosePolygon(false); else {
			this.AddLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY);
		this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.ClosePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY);
		this.mPoints.push(new jeash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,AddDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,AddLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new jeash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,ClosePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.AddLineSegment();
				var drawable = { points : this.mPoints, fillColour : this.mFillColour, fillAlpha : this.mFillAlpha, solidGradient : this.mSolidGradient, bitmap : this.mBitmap, lineJobs : this.mLineJobs};
				this.AddDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.jeashChanged = true;
	}
	,getContext: function() {
		try {
			return this.jeashSurface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,jeashAdjustSurface: function() {
		if(Reflect.field(this.jeashSurface,"getContext") == null) return;
		var width = Math.ceil(this.jeashExtent.width - this.jeashExtent.x);
		var height = Math.ceil(this.jeashExtent.height - this.jeashExtent.y);
		if(width > 5000 || height > 5000) return;
		var dstCanvas = js.Lib.document.createElement("canvas");
		var ctx = dstCanvas.getContext("2d");
		dstCanvas.width = width;
		dstCanvas.height = height;
		if(this.jeashSurface.id != null) jeash.Lib.jeashSetSurfaceId(dstCanvas,this.jeashSurface.id);
		jeash.Lib.jeashDrawToSurface(this.jeashSurface,dstCanvas);
		if(jeash.Lib.jeashIsOnStage(this.jeashSurface)) {
			jeash.Lib.jeashAppendSurface(dstCanvas);
			jeash.Lib.jeashCopyStyle(this.jeashSurface,dstCanvas);
			jeash.Lib.jeashSwapSurface(this.jeashSurface,dstCanvas);
			jeash.Lib.jeashRemoveSurface(this.jeashSurface);
		}
		this.jeashSurface = dstCanvas;
	}
	,__class__: jeash.display.Graphics
}
jeash.display.IGraphicsData = function() { }
$hxClasses["jeash.display.IGraphicsData"] = jeash.display.IGraphicsData;
jeash.display.IGraphicsData.__name__ = ["jeash","display","IGraphicsData"];
jeash.display.IGraphicsData.prototype = {
	jeashGraphicsDataType: null
	,__class__: jeash.display.IGraphicsData
}
jeash.display.GraphicsDataType = $hxClasses["jeash.display.GraphicsDataType"] = { __ename__ : ["jeash","display","GraphicsDataType"], __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
jeash.display.GraphicsDataType.STROKE = ["STROKE",0];
jeash.display.GraphicsDataType.STROKE.toString = $estr;
jeash.display.GraphicsDataType.STROKE.__enum__ = jeash.display.GraphicsDataType;
jeash.display.GraphicsDataType.SOLID = ["SOLID",1];
jeash.display.GraphicsDataType.SOLID.toString = $estr;
jeash.display.GraphicsDataType.SOLID.__enum__ = jeash.display.GraphicsDataType;
jeash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
jeash.display.GraphicsDataType.GRADIENT.toString = $estr;
jeash.display.GraphicsDataType.GRADIENT.__enum__ = jeash.display.GraphicsDataType;
jeash.display.GraphicsDataType.PATH = ["PATH",3];
jeash.display.GraphicsDataType.PATH.toString = $estr;
jeash.display.GraphicsDataType.PATH.__enum__ = jeash.display.GraphicsDataType;
jeash.display.IGraphicsFill = function() { }
$hxClasses["jeash.display.IGraphicsFill"] = jeash.display.IGraphicsFill;
jeash.display.IGraphicsFill.__name__ = ["jeash","display","IGraphicsFill"];
jeash.display.IGraphicsFill.prototype = {
	jeashGraphicsFillType: null
	,__class__: jeash.display.IGraphicsFill
}
jeash.display.GraphicsFillType = $hxClasses["jeash.display.GraphicsFillType"] = { __ename__ : ["jeash","display","GraphicsFillType"], __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
jeash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
jeash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
jeash.display.GraphicsFillType.SOLID_FILL.__enum__ = jeash.display.GraphicsFillType;
jeash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
jeash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
jeash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = jeash.display.GraphicsFillType;
jeash.display.InterpolationMethod = $hxClasses["jeash.display.InterpolationMethod"] = { __ename__ : ["jeash","display","InterpolationMethod"], __constructs__ : ["RGB","LINEAR_RGB"] }
jeash.display.InterpolationMethod.RGB = ["RGB",0];
jeash.display.InterpolationMethod.RGB.toString = $estr;
jeash.display.InterpolationMethod.RGB.__enum__ = jeash.display.InterpolationMethod;
jeash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
jeash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
jeash.display.InterpolationMethod.LINEAR_RGB.__enum__ = jeash.display.InterpolationMethod;
jeash.display.JointStyle = $hxClasses["jeash.display.JointStyle"] = { __ename__ : ["jeash","display","JointStyle"], __constructs__ : ["MITER","ROUND","BEVEL"] }
jeash.display.JointStyle.MITER = ["MITER",0];
jeash.display.JointStyle.MITER.toString = $estr;
jeash.display.JointStyle.MITER.__enum__ = jeash.display.JointStyle;
jeash.display.JointStyle.ROUND = ["ROUND",1];
jeash.display.JointStyle.ROUND.toString = $estr;
jeash.display.JointStyle.ROUND.__enum__ = jeash.display.JointStyle;
jeash.display.JointStyle.BEVEL = ["BEVEL",2];
jeash.display.JointStyle.BEVEL.toString = $estr;
jeash.display.JointStyle.BEVEL.__enum__ = jeash.display.JointStyle;
jeash.display.LineScaleMode = $hxClasses["jeash.display.LineScaleMode"] = { __ename__ : ["jeash","display","LineScaleMode"], __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
jeash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
jeash.display.LineScaleMode.HORIZONTAL.toString = $estr;
jeash.display.LineScaleMode.HORIZONTAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.NONE = ["NONE",1];
jeash.display.LineScaleMode.NONE.toString = $estr;
jeash.display.LineScaleMode.NONE.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.NORMAL = ["NORMAL",2];
jeash.display.LineScaleMode.NORMAL.toString = $estr;
jeash.display.LineScaleMode.NORMAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
jeash.display.LineScaleMode.VERTICAL.toString = $estr;
jeash.display.LineScaleMode.VERTICAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.Loader = function() {
	jeash.display.DisplayObjectContainer.call(this);
	this.contentLoaderInfo = jeash.display.LoaderInfo.create(this);
	this.name = "Loader " + jeash.display.DisplayObject.mNameID++;
};
$hxClasses["jeash.display.Loader"] = jeash.display.Loader;
jeash.display.Loader.__name__ = ["jeash","display","Loader"];
jeash.display.Loader.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Loader.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	content: null
	,contentLoaderInfo: null
	,mImage: null
	,mShape: null
	,load: function(request,context) {
		var parts = request.url.split(".");
		var extension = parts.length == 0?"":parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new jeash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(jeash.events.Event.COMPLETE,this.handleLoad.$bind(this),false,2147483647);
			this.mImage.jeashLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new jeash.display.Bitmap(this.mImage);
			this.contentLoaderInfo["content"] = this.content;
			this.addChild(this.content);
		} catch( e ) {
			haxe.Log.trace("Error " + e,{ fileName : "Loader.hx", lineNumber : 90, className : "jeash.display.Loader", methodName : "load"});
			var evt = new jeash.events.IOErrorEvent(jeash.events.IOErrorEvent.IO_ERROR);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new jeash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,handleLoad: function(e) {
		this.content.jeashInvalidateBounds();
		this.content.jeashRender(null,null);
		this.contentLoaderInfo.removeEventListener(jeash.events.Event.COMPLETE,this.handleLoad.$bind(this));
	}
	,BuildBounds: function() {
		jeash.display.DisplayObjectContainer.prototype.BuildBounds.call(this);
		if(this.mImage != null) {
			var r = new jeash.geom.Rectangle(0,0,this.mImage.getWidth(),this.mImage.getHeight());
			if(r.width != 0 || r.height != 0) {
				if(this.mBoundsRect.width == 0 && this.mBoundsRect.height == 0) this.mBoundsRect = r.clone(); else this.mBoundsRect.extendBounds(r);
			}
		}
	}
	,jeashIsOnStage: function() {
		if(this.parent != null && this.parent.jeashIsOnStage() == true) return true; else return false;
	}
	,__class__: jeash.display.Loader
});
jeash.display.LoaderInfo = function() {
	jeash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["jeash.display.LoaderInfo"] = jeash.display.LoaderInfo;
jeash.display.LoaderInfo.__name__ = ["jeash","display","LoaderInfo"];
jeash.display.LoaderInfo.create = function(ldr) {
	var li = new jeash.display.LoaderInfo();
	li.loader = ldr;
	return li;
}
jeash.display.LoaderInfo.__super__ = jeash.events.EventDispatcher;
jeash.display.LoaderInfo.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,childAllowsParent: null
	,content: null
	,contentType: null
	,loader: null
	,parameters: null
	,url: null
	,__class__: jeash.display.LoaderInfo
});
jeash.display.MovieClip = function() {
	jeash.display.Sprite.call(this);
	this.enabled = true;
	this.mCurrentFrame = 0;
	this.mTotalFrames = 0;
	this.name = "MovieClip " + jeash.display.DisplayObject.mNameID++;
};
$hxClasses["jeash.display.MovieClip"] = jeash.display.MovieClip;
jeash.display.MovieClip.__name__ = ["jeash","display","MovieClip"];
jeash.display.MovieClip.__super__ = jeash.display.Sprite;
jeash.display.MovieClip.prototype = $extend(jeash.display.Sprite.prototype,{
	enabled: null
	,mCurrentFrame: null
	,mTotalFrames: null
	,GetTotalFrames: function() {
		return this.mTotalFrames;
	}
	,GetCurrentFrame: function() {
		return this.mCurrentFrame;
	}
	,__class__: jeash.display.MovieClip
});
jeash.display.PixelSnapping = $hxClasses["jeash.display.PixelSnapping"] = { __ename__ : ["jeash","display","PixelSnapping"], __constructs__ : ["NEVER","AUTO","ALWAYS"] }
jeash.display.PixelSnapping.NEVER = ["NEVER",0];
jeash.display.PixelSnapping.NEVER.toString = $estr;
jeash.display.PixelSnapping.NEVER.__enum__ = jeash.display.PixelSnapping;
jeash.display.PixelSnapping.AUTO = ["AUTO",1];
jeash.display.PixelSnapping.AUTO.toString = $estr;
jeash.display.PixelSnapping.AUTO.__enum__ = jeash.display.PixelSnapping;
jeash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
jeash.display.PixelSnapping.ALWAYS.toString = $estr;
jeash.display.PixelSnapping.ALWAYS.__enum__ = jeash.display.PixelSnapping;
jeash.display.Shape = function() {
	this.jeashGraphics = new jeash.display.Graphics();
	jeash.display.DisplayObject.call(this);
	this.name = "Shape " + jeash.display.DisplayObject.mNameID++;
	jeash.Lib.jeashSetSurfaceId(this.jeashGraphics.jeashSurface,this.name);
};
$hxClasses["jeash.display.Shape"] = jeash.display.Shape;
jeash.display.Shape.__name__ = ["jeash","display","Shape"];
jeash.display.Shape.__super__ = jeash.display.DisplayObject;
jeash.display.Shape.prototype = $extend(jeash.display.DisplayObject.prototype,{
	jeashGraphics: null
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,__class__: jeash.display.Shape
});
jeash.display.SpreadMethod = $hxClasses["jeash.display.SpreadMethod"] = { __ename__ : ["jeash","display","SpreadMethod"], __constructs__ : ["REPEAT","REFLECT","PAD"] }
jeash.display.SpreadMethod.REPEAT = ["REPEAT",0];
jeash.display.SpreadMethod.REPEAT.toString = $estr;
jeash.display.SpreadMethod.REPEAT.__enum__ = jeash.display.SpreadMethod;
jeash.display.SpreadMethod.REFLECT = ["REFLECT",1];
jeash.display.SpreadMethod.REFLECT.toString = $estr;
jeash.display.SpreadMethod.REFLECT.__enum__ = jeash.display.SpreadMethod;
jeash.display.SpreadMethod.PAD = ["PAD",2];
jeash.display.SpreadMethod.PAD.toString = $estr;
jeash.display.SpreadMethod.PAD.__enum__ = jeash.display.SpreadMethod;
jeash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.jeashIsCancelled = false;
	this.jeashIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = jeash.events.EventPhase.AT_TARGET;
};
$hxClasses["jeash.events.Event"] = jeash.events.Event;
jeash.events.Event.__name__ = ["jeash","events","Event"];
jeash.events.Event.prototype = {
	bubbles: null
	,cancelable: null
	,eventPhase: null
	,target: null
	,currentTarget: null
	,type: null
	,jeashIsCancelled: null
	,jeashIsCancelledNow: null
	,jeashSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,jeashGetIsCancelled: function() {
		return this.jeashIsCancelled;
	}
	,jeashGetIsCancelledNow: function() {
		return this.jeashIsCancelledNow;
	}
	,jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: jeash.events.Event
}
jeash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["jeash.events.MouseEvent"] = jeash.events.MouseEvent;
jeash.events.MouseEvent.__name__ = ["jeash","events","MouseEvent"];
jeash.events.MouseEvent.jeashCreate = function(type,event,local,target) {
	var jeashMouseDown = false;
	var delta = type == jeash.events.MouseEvent.MOUSE_WHEEL?(function($this) {
		var $r;
		var mouseEvent = event;
		$r = mouseEvent.wheelDelta?js.Lib.isOpera?mouseEvent.wheelDelta / 40 | 0:mouseEvent.wheelDelta / 120 | 0:mouseEvent.detail?-mouseEvent.detail | 0:null;
		return $r;
	}(this)):2;
	if(type == jeash.events.MouseEvent.MOUSE_DOWN) jeashMouseDown = event.which != null?event.which == 1:event.button != null?js.Lib.isIE && event.button == 1 || event.button == 0:false; else if(type == jeash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) jeashMouseDown = false; else if(event.button != null) {
				if(js.Lib.isIE && event.button == 1 || event.button == 0) jeashMouseDown = false; else jeashMouseDown = false;
			}
		}
	}
	var pseudoEvent = new jeash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,jeashMouseDown,delta);
	pseudoEvent.stageX = jeash.Lib.jeashGetCurrent().GetStage().jeashGetMouseX();
	pseudoEvent.stageY = jeash.Lib.jeashGetCurrent().GetStage().jeashGetMouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
jeash.events.MouseEvent.__super__ = jeash.events.Event;
jeash.events.MouseEvent.prototype = $extend(jeash.events.Event.prototype,{
	altKey: null
	,buttonDown: null
	,ctrlKey: null
	,delta: null
	,localX: null
	,localY: null
	,relatedObject: null
	,shiftKey: null
	,stageX: null
	,stageY: null
	,commandKey: null
	,clickCount: null
	,jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: jeash.events.MouseEvent
});
jeash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["jeash.events.TouchEvent"] = jeash.events.TouchEvent;
jeash.events.TouchEvent.__name__ = ["jeash","events","TouchEvent"];
jeash.events.TouchEvent.jeashCreate = function(type,event,touch,local,target) {
	var evt = new jeash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = jeash.Lib.jeashGetCurrent().GetStage().jeashGetMouseX();
	evt.stageY = jeash.Lib.jeashGetCurrent().GetStage().jeashGetMouseY();
	evt.target = target;
	return evt;
}
jeash.events.TouchEvent.__super__ = jeash.events.Event;
jeash.events.TouchEvent.prototype = $extend(jeash.events.Event.prototype,{
	altKey: null
	,buttonDown: null
	,ctrlKey: null
	,delta: null
	,localX: null
	,localY: null
	,relatedObject: null
	,shiftKey: null
	,stageX: null
	,stageY: null
	,commandKey: null
	,isPrimaryTouchPoint: null
	,touchPointID: null
	,jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: jeash.events.TouchEvent
});
jeash.display.Stage = function(width,height) {
	jeash.display.DisplayObjectContainer.call(this);
	this.jeashFocusObject = null;
	this.jeashWindowWidth = width;
	this.jeashWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = jeash.display.StageScaleMode.SHOW_ALL;
	this.jeashStageMatrix = new jeash.geom.Matrix();
	this.tabEnabled = true;
	this.jeashSetFrameRate(60.0);
	this.jeashSetBackgroundColour(16777215);
	this.name = "Stage";
	this.loaderInfo = jeash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.jeashWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.jeashWindowHeight);
	this.jeashPointInPathMode = jeash.display.Graphics.jeashDetectIsPointInPathMode();
	this.jeashMouseOverObjects = [];
	this.jeashSetShowDefaultContextMenu(true);
	this.jeashTouchInfo = [];
	this.jeashFocusOverObjects = [];
	this.jeashUIEventsQueue = new Array(1000);
	this.jeashUIEventsQueueIndex = 0;
};
$hxClasses["jeash.display.Stage"] = jeash.display.Stage;
jeash.display.Stage.__name__ = ["jeash","display","Stage"];
jeash.display.Stage.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Stage.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	jeashWindowWidth: null
	,jeashWindowHeight: null
	,jeashTimer: null
	,jeashInterval: null
	,jeashDragObject: null
	,jeashDragBounds: null
	,jeashDragOffsetX: null
	,jeashDragOffsetY: null
	,jeashMouseOverObjects: null
	,jeashStageMatrix: null
	,jeashStageActive: null
	,jeashFrameRate: null
	,jeashBackgroundColour: null
	,jeashShowDefaultContextMenu: null
	,jeashTouchInfo: null
	,jeashFocusOverObjects: null
	,jeashUIEventsQueue: null
	,jeashUIEventsQueueIndex: null
	,jeashPointInPathMode: null
	,stageWidth: null
	,stageHeight: null
	,frameRate: null
	,quality: null
	,scaleMode: null
	,stageFocusRect: null
	,focus: null
	,backgroundColor: null
	,showDefaultContextMenu: null
	,displayState: null
	,jeashGetStageWidth: function() {
		return this.jeashWindowWidth;
	}
	,jeashGetStageHeight: function() {
		return this.jeashWindowHeight;
	}
	,jeashFocusObject: null
	,jeashDrag: function(point) {
		var p = this.jeashDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.jeashDragOffsetX;
		var y = point.y + this.jeashDragOffsetY;
		if(this.jeashDragBounds != null) {
			if(x < this.jeashDragBounds.x) x = this.jeashDragBounds.x; else if(x > this.jeashDragBounds.get_right()) x = this.jeashDragBounds.get_right();
			if(y < this.jeashDragBounds.y) y = this.jeashDragBounds.y; else if(y > this.jeashDragBounds.get_bottom()) y = this.jeashDragBounds.get_bottom();
		}
		this.jeashDragObject.jeashSetX(x);
		this.jeashDragObject.jeashSetY(y);
	}
	,jeashCheckFocusInOuts: function(event,inStack) {
		var new_n = inStack.length;
		var new_obj = new_n > 0?inStack[new_n - 1]:null;
		var old_n = this.jeashFocusOverObjects.length;
		var old_obj = old_n > 0?this.jeashFocusOverObjects[old_n - 1]:null;
		if(new_obj != old_obj) {
			var common = 0;
			while(common < new_n && common < old_n && inStack[common] == this.jeashFocusOverObjects[common]) common++;
			var focusOut = new jeash.events.FocusEvent(jeash.events.FocusEvent.FOCUS_OUT,false,false,new_obj,false,0);
			var i = old_n - 1;
			while(i >= common) {
				this.jeashFocusOverObjects[i].dispatchEvent(focusOut);
				i--;
			}
			var focusIn = new jeash.events.FocusEvent(jeash.events.FocusEvent.FOCUS_IN,false,false,old_obj,false,0);
			var i1 = new_n - 1;
			while(i1 >= common) {
				inStack[i1].dispatchEvent(focusIn);
				i1--;
			}
			this.jeashFocusOverObjects = inStack;
			this.jeashSetFocus(new_obj);
		}
	}
	,jeashCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.jeashMouseOverObjects:touchInfo.touchOverObjects;
		var events = touchInfo == null?jeash.display.Stage.jeashMouseChanges:jeash.display.Stage.jeashTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.jeashFireEvent(event.jeashCreateSimilar(events[0],new_obj,old_obj));
			if(new_obj != null) new_obj.jeashFireEvent(event.jeashCreateSimilar(events[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.jeashCreateSimilar(events[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.jeashCreateSimilar(events[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.jeashMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,jeashQueueStageEvent: function(evt) {
		this.jeashUIEventsQueue[this.jeashUIEventsQueueIndex++] = evt;
	}
	,jeashProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.jeashOnResize(this.jeashGetStageWidth(),this.jeashGetStageHeight());
			break;
		case "mousemove":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyIdentifier != null?(function($this) {
				var $r;
				try {
					$r = jeash.ui.Keyboard.jeashConvertWebkitCode(evt1.keyIdentifier);
				} catch( e ) {
					$r = evt1.keyCode;
				}
				return $r;
			}(this)):jeash.ui.Keyboard.jeashConvertMozillaCode(evt1.keyCode);
			this.jeashOnKey(keyCode,true,evt1.keyLocation,evt1.ctrlKey,evt1.altKey,evt1.shiftKey);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyIdentifier != null?(function($this) {
				var $r;
				try {
					$r = jeash.ui.Keyboard.jeashConvertWebkitCode(evt1.keyIdentifier);
				} catch( e ) {
					$r = evt1.keyCode;
				}
				return $r;
			}(this)):jeash.ui.Keyboard.jeashConvertMozillaCode(evt1.keyCode);
			this.jeashOnKey(keyCode,false,evt1.keyLocation,evt1.ctrlKey,evt1.altKey,evt1.shiftKey);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new jeash.display.TouchInfo();
			this.jeashTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_BEGIN,touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			var touchInfo = this.jeashTouchInfo[evt1.changedTouches[0].identifier];
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_MOVE,touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			var touchInfo = this.jeashTouchInfo[evt1.changedTouches[0].identifier];
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_END,touchInfo,true);
			this.jeashTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		default:
		}
	}
	,jeashOnMouse: function(event,type) {
		var point = new jeash.geom.Point(event.clientX - jeash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,event.clientY - jeash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		if(this.jeashDragObject != null) this.jeashDrag(point);
		var obj = this.jeashGetObjectUnderPoint(point);
		this.jeashSetMouseX(point.x);
		this.jeashSetMouseY(point.y);
		var stack = new Array();
		if(obj != null) obj.jeashGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = jeash.events.MouseEvent.jeashCreate(type,event,local,obj);
			this.jeashCheckInOuts(evt,stack);
			if(type == jeash.events.MouseEvent.MOUSE_DOWN) this.jeashCheckFocusInOuts(evt,stack);
			obj.jeashFireEvent(evt);
		} else {
			var evt = jeash.events.MouseEvent.jeashCreate(type,event,point,null);
			this.jeashCheckInOuts(evt,stack);
			if(type == jeash.events.MouseEvent.MOUSE_DOWN) this.jeashCheckFocusInOuts(evt,stack);
		}
	}
	,jeashOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var point = new jeash.geom.Point(touch.pageX - jeash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,touch.pageY - jeash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		var obj = this.jeashGetObjectUnderPoint(point);
		this.jeashSetMouseX(point.x);
		this.jeashSetMouseY(point.y);
		var stack = new Array();
		if(obj != null) obj.jeashGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = jeash.events.TouchEvent.jeashCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.jeashCheckInOuts(evt,stack,touchInfo);
			obj.jeashFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case jeash.events.TouchEvent.TOUCH_BEGIN:
					$r = jeash.events.MouseEvent.MOUSE_DOWN;
					break;
				case jeash.events.TouchEvent.TOUCH_END:
					$r = jeash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.jeashDragObject != null) $this.jeashDrag(point);
						$r = jeash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.jeashFireEvent(jeash.events.MouseEvent.jeashCreate(mouseType,evt,local,obj));
		} else {
			var evt = jeash.events.TouchEvent.jeashCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.jeashCheckInOuts(evt,stack,touchInfo);
		}
	}
	,jeashOnKey: function(code,pressed,inChar,ctrl,alt,shift) {
		var event = new jeash.events.KeyboardEvent(pressed?jeash.events.KeyboardEvent.KEY_DOWN:jeash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,shift || ctrl?1:0,ctrl,alt,shift);
		this.dispatchEvent(event);
	}
	,jeashOnResize: function(inW,inH) {
		this.jeashWindowWidth = inW;
		this.jeashWindowHeight = inH;
		var event = new jeash.events.Event(jeash.events.Event.RESIZE);
		event.target = this;
		this.jeashBroadcast(event);
	}
	,jeashGetBackgroundColour: function() {
		return this.jeashBackgroundColour;
	}
	,jeashSetBackgroundColour: function(col) {
		this.jeashBackgroundColour = col;
		return col;
	}
	,jeashSetFocus: function(inObj) {
		return this.jeashFocusObject = inObj;
	}
	,jeashGetFocus: function() {
		return this.jeashFocusObject;
	}
	,jeashRenderAll: function() {
		this.jeashRender(null,null);
	}
	,jeashSetQuality: function(inQuality) {
		this.quality = inQuality;
		return inQuality;
	}
	,jeashGetQuality: function() {
		return this.quality != null?this.quality:jeash.display.StageQuality.BEST;
	}
	,jeashGetFrameRate: function() {
		return this.jeashFrameRate;
	}
	,jeashSetFrameRate: function(speed) {
		var window = js.Lib.window;
		this.jeashInterval = 1000.0 / speed | 0;
		this.jeashUpdateNextWake();
		this.jeashFrameRate = speed;
		return speed;
	}
	,jeashUpdateNextWake: function() {
		var window = js.Lib.window;
		window.clearInterval(this.jeashTimer);
		this.jeashTimer = window.setInterval(this.jeashStageRender.$bind(this),this.jeashInterval,[]);
	}
	,jeashStageRender: function(_) {
		if(!this.jeashStageActive) {
			this.jeashOnResize(this.jeashWindowWidth,this.jeashWindowHeight);
			var event = new jeash.events.Event(jeash.events.Event.ACTIVATE);
			event.target = this;
			this.jeashBroadcast(event);
			this.jeashStageActive = true;
		}
		var _g1 = 0, _g = this.jeashUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashUIEventsQueue[i] != null) this.jeashProcessStageEvent(this.jeashUIEventsQueue[i]);
		}
		this.jeashUIEventsQueueIndex = 0;
		var event = new jeash.events.Event(jeash.events.Event.ENTER_FRAME);
		this.jeashBroadcast(event);
		this.jeashRenderAll();
		var event1 = new jeash.events.Event(jeash.events.Event.RENDER);
		this.jeashBroadcast(event1);
	}
	,jeashIsOnStage: function() {
		return true;
	}
	,jeashGetMouseX: function() {
		return this.mouseX;
	}
	,jeashSetMouseX: function(x) {
		this.mouseX = x;
		return x;
	}
	,jeashGetMouseY: function() {
		return this.mouseY;
	}
	,jeashSetMouseY: function(y) {
		this.mouseY = y;
		return y;
	}
	,jeashGetShowDefaultContextMenu: function() {
		return this.jeashShowDefaultContextMenu;
	}
	,jeashSetShowDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.jeashShowDefaultContextMenu && this.jeashShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) jeash.Lib.jeashDisableRightClick(); else jeash.Lib.jeashEnableRightClick();
		}
		this.jeashShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,jeashGetDisplayState: function() {
		return this.displayState;
	}
	,jeashSetDisplayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 1:
				jeash.Lib.jeashDisableFullScreen();
				break;
			case 0:
				jeash.Lib.jeashEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,jeashGetFullScreenWidth: function() {
		return jeash.Lib.jeashFullScreenWidth();
	}
	,jeashGetFullScreenHeight: function() {
		return jeash.Lib.jeashFullScreenHeight();
	}
	,__class__: jeash.display.Stage
	,__properties__: $extend(jeash.display.DisplayObjectContainer.prototype.__properties__,{set_displayState:"jeashSetDisplayState",get_displayState:"jeashGetDisplayState",set_showDefaultContextMenu:"jeashSetShowDefaultContextMenu",get_showDefaultContextMenu:"jeashGetShowDefaultContextMenu",set_backgroundColor:"jeashSetBackgroundColour",get_backgroundColor:"jeashGetBackgroundColour",set_focus:"jeashSetFocus",get_focus:"jeashGetFocus",set_quality:"jeashSetQuality",get_quality:"jeashGetQuality",set_frameRate:"jeashSetFrameRate",get_frameRate:"jeashGetFrameRate",get_stageHeight:"jeashGetStageHeight",get_stageWidth:"jeashGetStageWidth"})
});
jeash.display.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["jeash.display.TouchInfo"] = jeash.display.TouchInfo;
jeash.display.TouchInfo.__name__ = ["jeash","display","TouchInfo"];
jeash.display.TouchInfo.prototype = {
	touchOverObjects: null
	,__class__: jeash.display.TouchInfo
}
jeash.display.StageAlign = $hxClasses["jeash.display.StageAlign"] = { __ename__ : ["jeash","display","StageAlign"], __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
jeash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
jeash.display.StageAlign.TOP_RIGHT.toString = $estr;
jeash.display.StageAlign.TOP_RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
jeash.display.StageAlign.TOP_LEFT.toString = $estr;
jeash.display.StageAlign.TOP_LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.TOP = ["TOP",2];
jeash.display.StageAlign.TOP.toString = $estr;
jeash.display.StageAlign.TOP.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.RIGHT = ["RIGHT",3];
jeash.display.StageAlign.RIGHT.toString = $estr;
jeash.display.StageAlign.RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.LEFT = ["LEFT",4];
jeash.display.StageAlign.LEFT.toString = $estr;
jeash.display.StageAlign.LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
jeash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
jeash.display.StageAlign.BOTTOM_RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
jeash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
jeash.display.StageAlign.BOTTOM_LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM = ["BOTTOM",7];
jeash.display.StageAlign.BOTTOM.toString = $estr;
jeash.display.StageAlign.BOTTOM.__enum__ = jeash.display.StageAlign;
jeash.display.StageDisplayState = $hxClasses["jeash.display.StageDisplayState"] = { __ename__ : ["jeash","display","StageDisplayState"], __constructs__ : ["FULL_SCREEN","NORMAL"] }
jeash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",0];
jeash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
jeash.display.StageDisplayState.FULL_SCREEN.__enum__ = jeash.display.StageDisplayState;
jeash.display.StageDisplayState.NORMAL = ["NORMAL",1];
jeash.display.StageDisplayState.NORMAL.toString = $estr;
jeash.display.StageDisplayState.NORMAL.__enum__ = jeash.display.StageDisplayState;
jeash.display.StageQuality = function() { }
$hxClasses["jeash.display.StageQuality"] = jeash.display.StageQuality;
jeash.display.StageQuality.__name__ = ["jeash","display","StageQuality"];
jeash.display.StageQuality.prototype = {
	__class__: jeash.display.StageQuality
}
jeash.display.StageScaleMode = $hxClasses["jeash.display.StageScaleMode"] = { __ename__ : ["jeash","display","StageScaleMode"], __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
jeash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
jeash.display.StageScaleMode.SHOW_ALL.toString = $estr;
jeash.display.StageScaleMode.SHOW_ALL.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
jeash.display.StageScaleMode.NO_SCALE.toString = $estr;
jeash.display.StageScaleMode.NO_SCALE.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
jeash.display.StageScaleMode.NO_BORDER.toString = $estr;
jeash.display.StageScaleMode.NO_BORDER.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
jeash.display.StageScaleMode.EXACT_FIT.toString = $estr;
jeash.display.StageScaleMode.EXACT_FIT.__enum__ = jeash.display.StageScaleMode;
jeash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = jeash.events.Listener.sIDs++;
};
$hxClasses["jeash.events.Listener"] = jeash.events.Listener;
jeash.events.Listener.__name__ = ["jeash","events","Listener"];
jeash.events.Listener.prototype = {
	mListner: null
	,mUseCapture: null
	,mPriority: null
	,mID: null
	,Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: jeash.events.Listener
}
jeash.events.EventPhase = function() { }
$hxClasses["jeash.events.EventPhase"] = jeash.events.EventPhase;
jeash.events.EventPhase.__name__ = ["jeash","events","EventPhase"];
jeash.events.EventPhase.prototype = {
	__class__: jeash.events.EventPhase
}
jeash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["jeash.events.FocusEvent"] = jeash.events.FocusEvent;
jeash.events.FocusEvent.__name__ = ["jeash","events","FocusEvent"];
jeash.events.FocusEvent.__super__ = jeash.events.Event;
jeash.events.FocusEvent.prototype = $extend(jeash.events.Event.prototype,{
	keyCode: null
	,shiftKey: null
	,__class__: jeash.events.FocusEvent
});
jeash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	jeash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["jeash.events.HTTPStatusEvent"] = jeash.events.HTTPStatusEvent;
jeash.events.HTTPStatusEvent.__name__ = ["jeash","events","HTTPStatusEvent"];
jeash.events.HTTPStatusEvent.__super__ = jeash.events.Event;
jeash.events.HTTPStatusEvent.prototype = $extend(jeash.events.Event.prototype,{
	status: null
	,__class__: jeash.events.HTTPStatusEvent
});
jeash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["jeash.events.IOErrorEvent"] = jeash.events.IOErrorEvent;
jeash.events.IOErrorEvent.__name__ = ["jeash","events","IOErrorEvent"];
jeash.events.IOErrorEvent.__super__ = jeash.events.Event;
jeash.events.IOErrorEvent.prototype = $extend(jeash.events.Event.prototype,{
	text: null
	,__class__: jeash.events.IOErrorEvent
});
jeash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey) {
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.charCode = inCharCode == null?0:inCharCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.altKey = inAltKey == null?false:inAltKey;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
};
$hxClasses["jeash.events.KeyboardEvent"] = jeash.events.KeyboardEvent;
jeash.events.KeyboardEvent.__name__ = ["jeash","events","KeyboardEvent"];
jeash.events.KeyboardEvent.__super__ = jeash.events.Event;
jeash.events.KeyboardEvent.prototype = $extend(jeash.events.Event.prototype,{
	keyCode: null
	,charCode: null
	,keyLocation: null
	,ctrlKey: null
	,altKey: null
	,shiftKey: null
	,__class__: jeash.events.KeyboardEvent
});
jeash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["jeash.events.ProgressEvent"] = jeash.events.ProgressEvent;
jeash.events.ProgressEvent.__name__ = ["jeash","events","ProgressEvent"];
jeash.events.ProgressEvent.__super__ = jeash.events.Event;
jeash.events.ProgressEvent.prototype = $extend(jeash.events.Event.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,__class__: jeash.events.ProgressEvent
});
jeash.filters = {}
jeash.filters.BitmapFilter = function() { }
$hxClasses["jeash.filters.BitmapFilter"] = jeash.filters.BitmapFilter;
jeash.filters.BitmapFilter.__name__ = ["jeash","filters","BitmapFilter"];
jeash.filters.BitmapFilter.prototype = {
	clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,jeashApplyFilter: function(surface) {
	}
	,__class__: jeash.filters.BitmapFilter
}
jeash.geom = {}
jeash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
	this.color = 0;
};
$hxClasses["jeash.geom.ColorTransform"] = jeash.geom.ColorTransform;
jeash.geom.ColorTransform.__name__ = ["jeash","geom","ColorTransform"];
jeash.geom.ColorTransform.prototype = {
	alphaMultiplier: null
	,alphaOffset: null
	,blueMultiplier: null
	,blueOffset: null
	,color: null
	,greenMultiplier: null
	,greenOffset: null
	,redMultiplier: null
	,redOffset: null
	,__class__: jeash.geom.ColorTransform
}
jeash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null?1.0:in_a;
	this.b = in_b == null?0.0:in_b;
	this.c = in_c == null?0.0:in_c;
	this.d = in_d == null?1.0:in_d;
	this.tx = in_tx == null?0.0:in_tx;
	this.ty = in_ty == null?0.0:in_ty;
};
$hxClasses["jeash.geom.Matrix"] = jeash.geom.Matrix;
jeash.geom.Matrix.__name__ = ["jeash","geom","Matrix"];
jeash.geom.Matrix.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
	,clone: function() {
		return new jeash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,transformPoint: function(inPos) {
		return new jeash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,mult: function(m) {
		var result = new jeash.geom.Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,toMozString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += "px, ";
		m += this.ty;
		m += "px)";
		return m;
	}
	,toString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += ", ";
		m += this.ty;
		m += ")";
		return m;
	}
	,__class__: jeash.geom.Matrix
}
jeash.geom.Point = function(inX,inY) {
	this.x = inX == null?0.0:inX;
	this.y = inY == null?0.0:inY;
};
$hxClasses["jeash.geom.Point"] = jeash.geom.Point;
jeash.geom.Point.__name__ = ["jeash","geom","Point"];
jeash.geom.Point.prototype = {
	x: null
	,y: null
	,clone: function() {
		return new jeash.geom.Point(this.x,this.y);
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: jeash.geom.Point
}
jeash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0.;
	if(inWidth == null) inWidth = 0.;
	if(inY == null) inY = 0.;
	if(inX == null) inX = 0.;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["jeash.geom.Rectangle"] = jeash.geom.Rectangle;
jeash.geom.Rectangle.__name__ = ["jeash","geom","Rectangle"];
jeash.geom.Rectangle.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,right: null
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,bottom: null
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,topLeft: null
	,get_topLeft: function() {
		return new jeash.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new jeash.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,bottomRight: null
	,get_bottomRight: function() {
		return new jeash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,clone: function() {
		return new jeash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new jeash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,__class__: jeash.geom.Rectangle
	,__properties__: {set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right"}
}
jeash.geom.Transform = function(inParent) {
	this.mObj = inParent;
};
$hxClasses["jeash.geom.Transform"] = jeash.geom.Transform;
jeash.geom.Transform.__name__ = ["jeash","geom","Transform"];
jeash.geom.Transform.prototype = {
	matrix: null
	,mObj: null
	,jeashGetMatrix: function() {
		return this.mObj.jeashGetMatrix();
	}
	,jeashSetMatrix: function(inMatrix) {
		return this.mObj.jeashSetMatrix(inMatrix);
	}
	,GetPixelBounds: function() {
		return this.mObj.getBounds(jeash.Lib.jeashGetStage());
	}
	,GetColorTransform: function() {
		return new jeash.geom.ColorTransform();
	}
	,SetColorTransform: function(inColorTransform) {
		return inColorTransform;
	}
	,__class__: jeash.geom.Transform
	,__properties__: {set_matrix:"jeashSetMatrix",get_matrix:"jeashGetMatrix"}
}
jeash.media = {}
jeash.media.Sound = function(stream,context) {
	jeash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.jeashSoundChannels = new IntHash();
	this.jeashSoundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["jeash.media.Sound"] = jeash.media.Sound;
jeash.media.Sound.__name__ = ["jeash","media","Sound"];
jeash.media.Sound.jeashCanPlayType = function(extension) {
	var audio = js.Lib.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	switch(extension) {
	case "mp3":
		return playable(audio.canPlayType("audio/mpeg"));
	case "ogg":
		return playable(audio.canPlayType("audio/ogg; codecs=\"vorbis\""));
	case "wav":
		return playable(audio.canPlayType("audio/wav; codecs=\"1\""));
	case "aac":
		return playable(audio.canPlayType("audio/mp4; codecs=\"mp4a.40.2\""));
	default:
		return false;
	}
}
jeash.media.Sound.__super__ = jeash.events.EventDispatcher;
jeash.media.Sound.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,id3: null
	,isBuffering: null
	,length: null
	,url: null
	,jeashStreamUrl: null
	,jeashSoundChannels: null
	,jeashSoundIdx: null
	,jeashSoundCache: null
	,load: function(stream,context) {
		var url = stream.url.split("?");
		var extension = url[0].substr(url[0].lastIndexOf(".") + 1);
		if(!jeash.media.Sound.jeashCanPlayType(extension.toLowerCase())) jeash.Lib.trace("Warning: '" + stream.url + "' may not play on this browser.");
		this.jeashStreamUrl = stream.url;
		try {
			this.jeashSoundCache = new jeash.net.URLLoader(stream);
		} catch( e ) {
			jeash.Lib.trace("Warning: Could not preload '" + stream.url + "'");
		}
	}
	,__class__: jeash.media.Sound
});
jeash.media.SoundChannel = function() { }
$hxClasses["jeash.media.SoundChannel"] = jeash.media.SoundChannel;
jeash.media.SoundChannel.__name__ = ["jeash","media","SoundChannel"];
jeash.media.SoundChannel.__super__ = jeash.events.EventDispatcher;
jeash.media.SoundChannel.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	soundTransform: null
	,__setSoundTransform: function(v) {
		return this.soundTransform = v;
	}
	,__class__: jeash.media.SoundChannel
	,__properties__: {set_soundTransform:"__setSoundTransform"}
});
jeash.net = {}
jeash.net.URLLoader = function(request) {
	jeash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.dataFormat = jeash.net.URLLoaderDataFormat.TEXT;
	if(request != null) this.load(request);
};
$hxClasses["jeash.net.URLLoader"] = jeash.net.URLLoader;
jeash.net.URLLoader.__name__ = ["jeash","net","URLLoader"];
jeash.net.URLLoader.__super__ = jeash.events.EventDispatcher;
jeash.net.URLLoader.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,data: null
	,dataFormat: null
	,load: function(request) {
		if(request.contentType == null) {
			switch( (this.dataFormat)[1] ) {
			case 0:
				request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type","application/octet-stream"));
				break;
			default:
				request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type","application/x-www-form-urlencoded"));
			}
		} else request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type",request.contentType));
		this.requestUrl(request.url,request.method,request.data,request.requestHeaders);
	}
	,onData: function(_) {
		var content = this.getData();
		if(Std["is"](content,ArrayBuffer)) this.data = jeash.utils.ByteArray.jeashOfBuffer(content); else this.data = Std.string(content);
		var evt = new jeash.events.Event(jeash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new jeash.events.IOErrorEvent(jeash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new jeash.events.Event(jeash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var evt = new jeash.events.HTTPStatusEvent(jeash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new jeash.events.ProgressEvent(jeash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",this.onProgress.$bind(this),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else switch(s) {
			case null: case undefined:
				self.onError("Failed to connect or resolve host");
				break;
			case 12029:
				self.onError("Failed to connect to host");
				break;
			case 12007:
				self.onError("Unknown host");
				break;
			default:
				self.onError("Http Error #" + subject.status);
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		switch(true) {
		case Std["is"](data,jeash.utils.ByteArray):
			var data1 = data;
			switch( (this.dataFormat)[1] ) {
			case 0:
				uri = data1.jeashGetBuffer();
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
			break;
		case Std["is"](data,Dynamic):
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
			break;
		default:
			if(data != null) uri = data.toString();
		}
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + uri,true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		switch( (this.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g = 0;
		while(_g < requestHeaders.length) {
			var header = requestHeaders[_g];
			++_g;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			return xmlHttpRequest.response;
		};
	}
	,getData: function() {
	}
	,__class__: jeash.net.URLLoader
});
jeash.net.URLLoaderDataFormat = $hxClasses["jeash.net.URLLoaderDataFormat"] = { __ename__ : ["jeash","net","URLLoaderDataFormat"], __constructs__ : ["BINARY","TEXT","VARIABLES"] }
jeash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
jeash.net.URLLoaderDataFormat.BINARY.toString = $estr;
jeash.net.URLLoaderDataFormat.BINARY.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
jeash.net.URLLoaderDataFormat.TEXT.toString = $estr;
jeash.net.URLLoaderDataFormat.TEXT.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
jeash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
jeash.net.URLLoaderDataFormat.VARIABLES.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
};
$hxClasses["jeash.net.URLRequest"] = jeash.net.URLRequest;
jeash.net.URLRequest.__name__ = ["jeash","net","URLRequest"];
jeash.net.URLRequest.prototype = {
	url: null
	,requestHeaders: null
	,method: null
	,data: null
	,contentType: null
	,__class__: jeash.net.URLRequest
}
jeash.net.URLRequestHeader = function(name,value) {
	this.name = name;
	this.value = value;
};
$hxClasses["jeash.net.URLRequestHeader"] = jeash.net.URLRequestHeader;
jeash.net.URLRequestHeader.__name__ = ["jeash","net","URLRequestHeader"];
jeash.net.URLRequestHeader.prototype = {
	name: null
	,value: null
	,__class__: jeash.net.URLRequestHeader
}
jeash.text.FontStyle = $hxClasses["jeash.text.FontStyle"] = { __ename__ : ["jeash","text","FontStyle"], __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] }
jeash.text.FontStyle.REGULAR = ["REGULAR",0];
jeash.text.FontStyle.REGULAR.toString = $estr;
jeash.text.FontStyle.REGULAR.__enum__ = jeash.text.FontStyle;
jeash.text.FontStyle.ITALIC = ["ITALIC",1];
jeash.text.FontStyle.ITALIC.toString = $estr;
jeash.text.FontStyle.ITALIC.__enum__ = jeash.text.FontStyle;
jeash.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
jeash.text.FontStyle.BOLD_ITALIC.toString = $estr;
jeash.text.FontStyle.BOLD_ITALIC.__enum__ = jeash.text.FontStyle;
jeash.text.FontStyle.BOLD = ["BOLD",3];
jeash.text.FontStyle.BOLD.toString = $estr;
jeash.text.FontStyle.BOLD.__enum__ = jeash.text.FontStyle;
jeash.text.FontType = $hxClasses["jeash.text.FontType"] = { __ename__ : ["jeash","text","FontType"], __constructs__ : ["EMBEDDED","DEVICE"] }
jeash.text.FontType.EMBEDDED = ["EMBEDDED",0];
jeash.text.FontType.EMBEDDED.toString = $estr;
jeash.text.FontType.EMBEDDED.__enum__ = jeash.text.FontType;
jeash.text.FontType.DEVICE = ["DEVICE",1];
jeash.text.FontType.DEVICE.toString = $estr;
jeash.text.FontType.DEVICE.__enum__ = jeash.text.FontType;
jeash.text.TextField = function() {
	jeash.display.InteractiveObject.call(this);
	this.mWidth = 100;
	this.mHeight = 20;
	this.mHTMLMode = false;
	this.multiline = false;
	this.jeashGraphics = new jeash.display.Graphics();
	this.mFace = jeash.text.TextField.mDefaultFont;
	this.mAlign = jeash.text.TextFormatAlign.LEFT;
	this.mParagraphs = new Array();
	this.mSelStart = -1;
	this.mSelEnd = -1;
	this.mScrollH = 0;
	this.mScrollV = 1;
	this.mType = jeash.text.TextFieldType.DYNAMIC;
	this.SetAutoSize(jeash.text.TextFieldAutoSize.NONE);
	this.mTextHeight = 12;
	this.mMaxHeight = this.mTextHeight;
	this.mHTMLText = " ";
	this.mText = " ";
	this.mTextColour = 0;
	this.tabEnabled = false;
	this.mTryFreeType = true;
	this.selectable = true;
	this.mInsertPos = 0;
	this.jeashInputEnabled = false;
	this.mDownChar = 0;
	this.mSelectDrag = -1;
	this.mLineInfo = [];
	this.jeashSetDefaultTextFormat(new jeash.text.TextFormat());
	this.name = "TextField " + jeash.display.DisplayObject.mNameID++;
	jeash.Lib.jeashSetSurfaceId(this.jeashGraphics.jeashSurface,this.name);
	this.SetBorderColor(0);
	this.SetBorder(false);
	this.SetBackgroundColor(16777215);
	this.SetBackground(false);
};
$hxClasses["jeash.text.TextField"] = jeash.text.TextField;
jeash.text.TextField.__name__ = ["jeash","text","TextField"];
jeash.text.TextField.__super__ = jeash.display.InteractiveObject;
jeash.text.TextField.prototype = $extend(jeash.display.InteractiveObject.prototype,{
	text: null
	,defaultTextFormat: null
	,mHTMLText: null
	,mText: null
	,mTextColour: null
	,mType: null
	,autoSize: null
	,selectable: null
	,multiline: null
	,embedFonts: null
	,borderColor: null
	,background: null
	,backgroundColor: null
	,border: null
	,wordWrap: null
	,type: null
	,mTextHeight: null
	,mFace: null
	,mDownChar: null
	,mParagraphs: null
	,mTryFreeType: null
	,mLineInfo: null
	,mAlign: null
	,mHTMLMode: null
	,mSelStart: null
	,mSelEnd: null
	,mInsertPos: null
	,mSelectDrag: null
	,jeashInputEnabled: null
	,mWidth: null
	,mHeight: null
	,mScrollH: null
	,mScrollV: null
	,jeashGraphics: null
	,jeashGetWidth: function() {
		return this.getBounds(this.GetStage()).width;
	}
	,jeashGetHeight: function() {
		return this.getBounds(this.GetStage()).height;
	}
	,jeashSetWidth: function(inWidth) {
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(inWidth != this.mWidth) {
			this.mWidth = inWidth;
			this.Rebuild();
		}
		return this.mWidth;
	}
	,jeashSetHeight: function(inHeight) {
		if(this.parent != null) this.parent.jeashInvalidateBounds();
		if(this.mBoundsDirty) this.BuildBounds();
		if(inHeight != this.mHeight) {
			this.mHeight = inHeight;
			this.Rebuild();
		}
		return this.mHeight;
	}
	,GetType: function() {
		return this.mType;
	}
	,SetType: function(inType) {
		this.mType = inType;
		this.jeashInputEnabled = this.mType == jeash.text.TextFieldType.INPUT;
		if(this.mHTMLMode) {
			if(this.jeashInputEnabled) jeash.Lib.jeashSetContentEditable(this.jeashGraphics.jeashSurface,true); else jeash.Lib.jeashSetContentEditable(this.jeashGraphics.jeashSurface,false);
		} else if(this.jeashInputEnabled) {
			this.SetHTMLText(StringTools.replace(this.mText,"\n","<BR />"));
			jeash.Lib.jeashSetContentEditable(this.jeashGraphics.jeashSurface,true);
		}
		this.tabEnabled = this.GetType() == jeash.text.TextFieldType.INPUT;
		this.Rebuild();
		return inType;
	}
	,GetCaret: function() {
		return this.mInsertPos;
	}
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,mMaxWidth: null
	,mMaxHeight: null
	,mLimitRenderX: null
	,RenderRow: function(inRow,inY,inCharIdx,inAlign,inInsert) {
		var h = 0;
		var w = 0;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			if(chr.fh > h) h = chr.fh;
			w += chr.adv;
		}
		if(w > this.mMaxWidth) this.mMaxWidth = w;
		var full_height = h * 1.2 | 0;
		var align_x = 0;
		var insert_x = 0;
		if(inInsert != null) {
			if(this.autoSize != jeash.text.TextFieldAutoSize.NONE) {
				this.mScrollH = 0;
				insert_x = inInsert;
			} else {
				insert_x = inInsert - this.mScrollH;
				if(insert_x < 0) this.mScrollH -= (this.mLimitRenderX * 3 >> 2) - insert_x; else if(insert_x > this.mLimitRenderX) this.mScrollH += insert_x - (this.mLimitRenderX * 3 >> 2);
				if(this.mScrollH < 0) this.mScrollH = 0;
			}
		}
		if(this.autoSize == jeash.text.TextFieldAutoSize.NONE && w <= this.mLimitRenderX) {
			if(inAlign == jeash.text.TextFormatAlign.CENTER) align_x = this.mLimitRenderX - w >> 1; else if(inAlign == jeash.text.TextFormatAlign.RIGHT) align_x = this.mLimitRenderX - w;
		}
		var x_list = new Array();
		this.mLineInfo.push({ mY0 : inY, mIndex : inCharIdx - 1, mX : x_list});
		var cache_sel_font = null;
		var cache_normal_font = null;
		var x = align_x - this.mScrollH;
		var x0 = x;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			var adv = chr.adv;
			if(x + adv > this.mLimitRenderX) break;
			x_list.push(x);
			if(x >= 0) {
				var font = chr.font;
				if(chr.sel) {
					this.jeashGraphics.lineStyle();
					this.jeashGraphics.beginFill(2105440);
					this.jeashGraphics.drawRect(x,inY,adv,full_height);
					this.jeashGraphics.endFill();
					if(cache_normal_font == chr.font) font = cache_sel_font; else {
						font = jeash.text.FontInstance.CreateSolid(chr.font.GetFace(),chr.fh,16777215,1.0);
						cache_sel_font = font;
						cache_normal_font = chr.font;
					}
				}
				font.RenderChar(this.jeashGraphics,chr.chr,x,inY + (h - chr.fh) | 0);
			}
			x += adv;
		}
		x += this.mScrollH;
		return full_height;
	}
	,Rebuild: function() {
		if(this.mHTMLMode) return;
		this.mLineInfo = [];
		this.jeashGraphics.clear();
		if(this.background) {
			this.jeashGraphics.beginFill(this.backgroundColor);
			this.jeashGraphics.drawRect(-2,-2,this.jeashGetWidth() + 4,this.jeashGetHeight() + 4);
			this.jeashGraphics.endFill();
		}
		this.jeashGraphics.lineStyle(this.mTextColour);
		var insert_x = null;
		this.mMaxWidth = 0;
		var wrap = this.mLimitRenderX = this.wordWrap && !this.jeashInputEnabled?this.mWidth | 0:999999;
		var char_idx = 0;
		var h = 0;
		var s0 = this.mSelStart;
		var s1 = this.mSelEnd;
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var row = [];
			var row_width = 0;
			var last_word_break = 0;
			var last_word_break_width = 0;
			var last_word_char_idx = 0;
			var start_idx = char_idx;
			var tx = 0;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				var text = span.text;
				var font = span.font;
				var fh = font.jeashGetHeight();
				last_word_break = row.length;
				last_word_break_width = row_width;
				last_word_char_idx = char_idx;
				var _g5 = 0, _g4 = text.length;
				while(_g5 < _g4) {
					var ch = _g5++;
					var g = text.charCodeAt(ch);
					var adv = font.jeashGetAdvance(g);
					if(g == 32) {
						last_word_break = row.length;
						last_word_break_width = tx;
						last_word_char_idx = char_idx;
					}
					if(tx + adv > wrap) {
						if(last_word_break > 0) {
							var row_end = row.splice(last_word_break,row.length - last_word_break);
							h += this.RenderRow(row,h,start_idx,paragraph.align);
							row = row_end;
							tx -= last_word_break_width;
							start_idx = last_word_char_idx;
							last_word_break = 0;
							last_word_break_width = 0;
							last_word_char_idx = 0;
							if(row_end.length > 0 && row_end[0].chr == 32) {
								row_end.shift();
								start_idx++;
							}
						} else {
							h += this.RenderRow(row,h,char_idx,paragraph.align);
							row = [];
							tx = 0;
							start_idx = char_idx;
						}
					}
					row.push({ font : font, chr : g, x : tx, fh : fh, sel : char_idx >= s0 && char_idx < s1, adv : adv});
					tx += adv;
					char_idx++;
				}
			}
			if(row.length > 0) {
				h += this.RenderRow(row,h,start_idx,paragraph.align,insert_x);
				insert_x = null;
			}
		}
		var w = this.mMaxWidth;
		if(h < this.mTextHeight) h = this.mTextHeight;
		this.mMaxHeight = h;
		switch(this.autoSize) {
		case jeash.text.TextFieldAutoSize.LEFT:
			break;
		case jeash.text.TextFieldAutoSize.RIGHT:
			var x0 = this.jeashGetX() + this.jeashGetWidth();
			this.jeashSetX(this.mWidth - x0);
			break;
		case jeash.text.TextFieldAutoSize.CENTER:
			var x0 = this.jeashGetX() + this.jeashGetWidth() / 2;
			this.jeashSetX(this.mWidth / 2 - x0);
			break;
		default:
			if(this.wordWrap) this.jeashSetHeight(h);
		}
		if(this.border) {
			this.jeashGraphics.endFill();
			this.jeashGraphics.lineStyle(1,this.borderColor);
			this.jeashGraphics.drawRect(-2,-2,this.jeashGetWidth() + 4,this.jeashGetHeight() + 4);
		}
	}
	,GetBackgroundRect: function() {
		if(this.border) return new jeash.geom.Rectangle(-2,-2,this.jeashGetWidth() + 4,this.jeashGetHeight() + 4); else return new jeash.geom.Rectangle(0,0,this.jeashGetWidth(),this.jeashGetHeight());
	}
	,GetTextWidth: function() {
		return this.mMaxWidth;
	}
	,GetTextHeight: function() {
		return this.mMaxHeight;
	}
	,GetTextColour: function() {
		return this.mTextColour;
	}
	,SetTextColour: function(inCol) {
		this.mTextColour = inCol;
		this.RebuildText();
		return inCol;
	}
	,GetText: function() {
		if(this.mHTMLMode) this.ConvertHTMLToText(false);
		return this.mText;
	}
	,SetText: function(inText) {
		this.mText = inText;
		this.mHTMLMode = false;
		this.RebuildText();
		this.jeashInvalidateBounds();
		return this.mText;
	}
	,ConvertHTMLToText: function(inUnSetHTML) {
		this.mText = "";
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				this.mText += span.text;
			}
		}
		if(inUnSetHTML) {
			this.mHTMLMode = false;
			this.RebuildText();
		}
	}
	,SetAutoSize: function(inAutoSize) {
		this.autoSize = inAutoSize;
		this.Rebuild();
		return inAutoSize;
	}
	,SetWordWrap: function(inWordWrap) {
		this.wordWrap = inWordWrap;
		this.Rebuild();
		return this.wordWrap;
	}
	,SetBorder: function(inBorder) {
		this.border = inBorder;
		this.Rebuild();
		return inBorder;
	}
	,SetBorderColor: function(inBorderCol) {
		this.borderColor = inBorderCol;
		this.Rebuild();
		return inBorderCol;
	}
	,SetBackgroundColor: function(inCol) {
		this.backgroundColor = inCol;
		this.Rebuild();
		return inCol;
	}
	,SetBackground: function(inBack) {
		this.background = inBack;
		this.Rebuild();
		return inBack;
	}
	,GetHTMLText: function() {
		return this.mHTMLText;
	}
	,RebuildText: function() {
		this.mParagraphs = [];
		if(!this.mHTMLMode) {
			var font = jeash.text.FontInstance.CreateSolid(this.mFace,this.mTextHeight,this.mTextColour,1.0);
			var paras = this.mText.split("\n");
			var _g = 0;
			while(_g < paras.length) {
				var paragraph = paras[_g];
				++_g;
				this.mParagraphs.push({ align : this.mAlign, spans : [{ font : font, text : paragraph + "\n"}]});
			}
		}
		this.Rebuild();
	}
	,SetHTMLText: function(inHTMLText) {
		this.mParagraphs = new Array();
		this.mHTMLText = inHTMLText;
		if(!this.mHTMLMode) {
			var wrapper = js.Lib.document.createElement("div");
			wrapper.innerHTML = inHTMLText;
			var destination = new jeash.display.Graphics(wrapper);
			var jeashSurface = this.jeashGraphics.jeashSurface;
			if(jeash.Lib.jeashIsOnStage(jeashSurface)) {
				jeash.Lib.jeashAppendSurface(wrapper);
				jeash.Lib.jeashCopyStyle(jeashSurface,wrapper);
				jeash.Lib.jeashSwapSurface(jeashSurface,wrapper);
				jeash.Lib.jeashRemoveSurface(jeashSurface);
			}
			this.jeashGraphics = destination;
			this.jeashGraphics.jeashExtent.width = wrapper.width;
			this.jeashGraphics.jeashExtent.height = wrapper.height;
		} else this.jeashGraphics.jeashSurface.innerHTML = inHTMLText;
		this.mHTMLMode = true;
		this.RebuildText();
		this.jeashInvalidateBounds();
		return this.mHTMLText;
	}
	,jeashGetDefaultTextFormat: function() {
		return this.defaultTextFormat;
	}
	,jeashSetDefaultTextFormat: function(inFmt) {
		this.setTextFormat(inFmt);
		return inFmt;
	}
	,getTextFormat: function(beginIndex,endIndex) {
		return new jeash.text.TextFormat();
	}
	,setTextFormat: function(inFmt,beginIndex,endIndex) {
		if(inFmt.font != null) this.mFace = inFmt.font;
		if(inFmt.size != null) this.mTextHeight = inFmt.size | 0;
		if(inFmt.align != null) this.mAlign = inFmt.align;
		if(inFmt.color != null) this.mTextColour = inFmt.color;
		this.RebuildText();
		this.jeashInvalidateBounds();
		return this.getTextFormat();
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null; else if(this.mText.length > 1) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.mMaxWidth || local.y > this.mMaxHeight) return null; else return this;
		} else return jeash.display.InteractiveObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,jeashRender: function(parentMatrix,inMask,clipRect) {
		if(!this.jeashVisible) return;
		if(this.mMtxDirty || this.mMtxChainDirty) this.jeashValidateMatrix();
		var m = this.mFullMatrix.clone();
		if(!this.mHTMLMode && this.jeashFilters != null && (this.jeashGraphics.jeashChanged || inMask != null)) {
			if(this.jeashGraphics.jeashRender(inMask,m)) this.jeashInvalidateBounds();
			var _g = 0, _g1 = this.jeashFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.jeashApplyFilter(this.jeashGraphics.jeashSurface);
			}
		} else if(this.jeashGraphics.jeashRender(inMask,m)) this.jeashInvalidateBounds();
		m.tx = m.tx + this.jeashGraphics.jeashExtent.x * m.a + this.jeashGraphics.jeashExtent.y * m.c;
		m.ty = m.ty + this.jeashGraphics.jeashExtent.x * m.b + this.jeashGraphics.jeashExtent.y * m.d;
		if(!this.mHTMLMode && inMask != null) jeash.Lib.jeashDrawToSurface(this.jeashGraphics.jeashSurface,inMask,m,(this.parent != null?this.parent.alpha:1) * this.alpha,clipRect); else {
			jeash.Lib.jeashSetSurfaceTransform(this.jeashGraphics.jeashSurface,m);
			jeash.Lib.jeashSetSurfaceOpacity(this.jeashGraphics.jeashSurface,(this.parent != null?this.parent.alpha:1) * this.alpha);
		}
	}
	,__class__: jeash.text.TextField
	,__properties__: $extend(jeash.display.InteractiveObject.prototype.__properties__,{set_type:"SetType",get_type:"GetType",set_wordWrap:"SetWordWrap",set_border:"SetBorder",set_backgroundColor:"SetBackgroundColor",set_background:"SetBackground",set_borderColor:"SetBorderColor",set_autoSize:"SetAutoSize",set_defaultTextFormat:"jeashSetDefaultTextFormat",get_defaultTextFormat:"jeashGetDefaultTextFormat",set_text:"SetText",get_text:"GetText"})
});
jeash.text.FontInstanceMode = $hxClasses["jeash.text.FontInstanceMode"] = { __ename__ : ["jeash","text","FontInstanceMode"], __constructs__ : ["fimSolid"] }
jeash.text.FontInstanceMode.fimSolid = ["fimSolid",0];
jeash.text.FontInstanceMode.fimSolid.toString = $estr;
jeash.text.FontInstanceMode.fimSolid.__enum__ = jeash.text.FontInstanceMode;
jeash.text.FontInstance = function(inFont,inHeight) {
	this.mFont = inFont;
	this.mHeight = inHeight;
	this.mTryFreeType = true;
	this.mGlyphs = [];
	this.mCacheAsBitmap = false;
};
$hxClasses["jeash.text.FontInstance"] = jeash.text.FontInstance;
jeash.text.FontInstance.__name__ = ["jeash","text","FontInstance"];
jeash.text.FontInstance.CreateSolid = function(inFace,inHeight,inColour,inAlpha) {
	var id = "SOLID:" + inFace + ":" + inHeight + ":" + inColour + ":" + inAlpha;
	var f = jeash.text.FontInstance.mSolidFonts.get(id);
	if(f != null) return f;
	var font = new jeash.text.Font();
	font.jeashSetScale(inHeight);
	font.jeashSetFontName(inFace);
	if(font == null) return null;
	f = new jeash.text.FontInstance(font,inHeight);
	f.SetSolid(inColour,inAlpha);
	jeash.text.FontInstance.mSolidFonts.set(id,f);
	return f;
}
jeash.text.FontInstance.prototype = {
	mMode: null
	,mColour: null
	,mAlpha: null
	,mFont: null
	,mHeight: null
	,mGlyphs: null
	,mCacheAsBitmap: null
	,mTryFreeType: null
	,height: null
	,GetFace: function() {
		return this.mFont.fontName;
	}
	,jeashGetHeight: function() {
		return this.mHeight;
	}
	,SetSolid: function(inCol,inAlpha) {
		this.mColour = inCol;
		this.mAlpha = inAlpha;
		this.mMode = jeash.text.FontInstanceMode.fimSolid;
	}
	,RenderChar: function(inGraphics,inGlyph,inX,inY) {
		inGraphics.jeashClearLine();
		inGraphics.beginFill(this.mColour,this.mAlpha);
		this.mFont.jeashRender(inGraphics,inGlyph,inX,inY,this.mTryFreeType);
		inGraphics.endFill();
	}
	,jeashGetAdvance: function(inChar) {
		if(this.mFont == null) return 0;
		return this.mFont.jeashGetAdvance(inChar,this.mHeight);
	}
	,__class__: jeash.text.FontInstance
	,__properties__: {get_height:"jeashGetHeight"}
}
jeash.text.TextFieldAutoSize = function() { }
$hxClasses["jeash.text.TextFieldAutoSize"] = jeash.text.TextFieldAutoSize;
jeash.text.TextFieldAutoSize.__name__ = ["jeash","text","TextFieldAutoSize"];
jeash.text.TextFieldAutoSize.prototype = {
	__class__: jeash.text.TextFieldAutoSize
}
jeash.text.TextFieldType = function() { }
$hxClasses["jeash.text.TextFieldType"] = jeash.text.TextFieldType;
jeash.text.TextFieldType.__name__ = ["jeash","text","TextFieldType"];
jeash.text.TextFieldType.prototype = {
	__class__: jeash.text.TextFieldType
}
jeash.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["jeash.text.TextFormat"] = jeash.text.TextFormat;
jeash.text.TextFormat.__name__ = ["jeash","text","TextFormat"];
jeash.text.TextFormat.prototype = {
	align: null
	,bold: null
	,color: null
	,font: null
	,indent: null
	,italic: null
	,leading: null
	,leftMargin: null
	,rightMargin: null
	,size: null
	,target: null
	,underline: null
	,url: null
	,__class__: jeash.text.TextFormat
}
jeash.text.TextFormatAlign = $hxClasses["jeash.text.TextFormatAlign"] = { __ename__ : ["jeash","text","TextFormatAlign"], __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] }
jeash.text.TextFormatAlign.LEFT = ["LEFT",0];
jeash.text.TextFormatAlign.LEFT.toString = $estr;
jeash.text.TextFormatAlign.LEFT.__enum__ = jeash.text.TextFormatAlign;
jeash.text.TextFormatAlign.RIGHT = ["RIGHT",1];
jeash.text.TextFormatAlign.RIGHT.toString = $estr;
jeash.text.TextFormatAlign.RIGHT.__enum__ = jeash.text.TextFormatAlign;
jeash.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
jeash.text.TextFormatAlign.JUSTIFY.toString = $estr;
jeash.text.TextFormatAlign.JUSTIFY.__enum__ = jeash.text.TextFormatAlign;
jeash.text.TextFormatAlign.CENTER = ["CENTER",3];
jeash.text.TextFormatAlign.CENTER.toString = $estr;
jeash.text.TextFormatAlign.CENTER.__enum__ = jeash.text.TextFormatAlign;
jeash.ui = {}
jeash.ui.Keyboard = function() { }
$hxClasses["jeash.ui.Keyboard"] = jeash.ui.Keyboard;
jeash.ui.Keyboard.__name__ = ["jeash","ui","Keyboard"];
jeash.ui.Keyboard.jeashConvertWebkitCode = function(code) {
	switch(code.toLowerCase()) {
	case "backspace":
		return jeash.ui.Keyboard.BACKSPACE;
	case "tab":
		return jeash.ui.Keyboard.TAB;
	case "enter":
		return jeash.ui.Keyboard.ENTER;
	case "shift":
		return jeash.ui.Keyboard.SHIFT;
	case "control":
		return jeash.ui.Keyboard.CONTROL;
	case "capslock":
		return jeash.ui.Keyboard.CAPS_LOCK;
	case "escape":
		return jeash.ui.Keyboard.ESCAPE;
	case "space":
		return jeash.ui.Keyboard.SPACE;
	case "pageup":
		return jeash.ui.Keyboard.PAGE_UP;
	case "pagedown":
		return jeash.ui.Keyboard.PAGE_DOWN;
	case "end":
		return jeash.ui.Keyboard.END;
	case "home":
		return jeash.ui.Keyboard.HOME;
	case "left":
		return jeash.ui.Keyboard.LEFT;
	case "right":
		return jeash.ui.Keyboard.RIGHT;
	case "up":
		return jeash.ui.Keyboard.UP;
	case "down":
		return jeash.ui.Keyboard.DOWN;
	case "insert":
		return jeash.ui.Keyboard.INSERT;
	case "delete":
		return jeash.ui.Keyboard.DELETE;
	case "numlock":
		return jeash.ui.Keyboard.NUMLOCK;
	case "break":
		return jeash.ui.Keyboard.BREAK;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + code.substr(3));
	throw "Unrecognised key code: " + code;
	return 0;
}
jeash.ui.Keyboard.jeashConvertMozillaCode = function(code) {
	switch(code) {
	case jeash.ui.Keyboard.DOM_VK_BACK_SPACE:
		return jeash.ui.Keyboard.BACKSPACE;
	case jeash.ui.Keyboard.DOM_VK_TAB:
		return jeash.ui.Keyboard.TAB;
	case jeash.ui.Keyboard.DOM_VK_RETURN:
		return jeash.ui.Keyboard.ENTER;
	case jeash.ui.Keyboard.DOM_VK_ENTER:
		return jeash.ui.Keyboard.ENTER;
	case jeash.ui.Keyboard.DOM_VK_SHIFT:
		return jeash.ui.Keyboard.SHIFT;
	case jeash.ui.Keyboard.DOM_VK_CONTROL:
		return jeash.ui.Keyboard.CONTROL;
	case jeash.ui.Keyboard.DOM_VK_CAPS_LOCK:
		return jeash.ui.Keyboard.CAPS_LOCK;
	case jeash.ui.Keyboard.DOM_VK_ESCAPE:
		return jeash.ui.Keyboard.ESCAPE;
	case jeash.ui.Keyboard.DOM_VK_SPACE:
		return jeash.ui.Keyboard.SPACE;
	case jeash.ui.Keyboard.DOM_VK_PAGE_UP:
		return jeash.ui.Keyboard.PAGE_UP;
	case jeash.ui.Keyboard.DOM_VK_PAGE_DOWN:
		return jeash.ui.Keyboard.PAGE_DOWN;
	case jeash.ui.Keyboard.DOM_VK_END:
		return jeash.ui.Keyboard.END;
	case jeash.ui.Keyboard.DOM_VK_HOME:
		return jeash.ui.Keyboard.HOME;
	case jeash.ui.Keyboard.DOM_VK_LEFT:
		return jeash.ui.Keyboard.LEFT;
	case jeash.ui.Keyboard.DOM_VK_RIGHT:
		return jeash.ui.Keyboard.RIGHT;
	case jeash.ui.Keyboard.DOM_VK_UP:
		return jeash.ui.Keyboard.UP;
	case jeash.ui.Keyboard.DOM_VK_DOWN:
		return jeash.ui.Keyboard.DOWN;
	case jeash.ui.Keyboard.DOM_VK_INSERT:
		return jeash.ui.Keyboard.INSERT;
	case jeash.ui.Keyboard.DOM_VK_DELETE:
		return jeash.ui.Keyboard.DELETE;
	case jeash.ui.Keyboard.DOM_VK_NUM_LOCK:
		return jeash.ui.Keyboard.NUMLOCK;
	default:
		return code;
	}
}
jeash.ui.Keyboard.prototype = {
	__class__: jeash.ui.Keyboard
}
jeash.utils = {}
jeash.utils.ByteArray = function(len) {
	if(len == null) len = 8192;
	this.position = 0;
	this.length = 0;
	var buffer = new ArrayBuffer(len);
	this.data = new DataView(buffer);
	this.byteView = new Uint8Array(buffer);
	this.bigEndian = false;
};
$hxClasses["jeash.utils.ByteArray"] = jeash.utils.ByteArray;
jeash.utils.ByteArray.__name__ = ["jeash","utils","ByteArray"];
jeash.utils.ByteArray.jeashOfBuffer = function(buffer) {
	var bytes = new jeash.utils.ByteArray(buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	bytes.length = buffer.byteLength;
	return bytes;
}
jeash.utils.ByteArray.prototype = {
	data: null
	,byteView: null
	,bigEndian: null
	,position: null
	,length: null
	,jeashGetBytesAvailable: function() {
		return this.length - this.position;
	}
	,jeashResizeBuffer: function(len) {
		var initLength = this.byteView.length;
		var resized = new Uint8Array(len);
		resized.set(this.byteView);
		this.data = new DataView(resized.buffer);
		this.byteView = resized;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var fcc = String.fromCharCode;
		var max = this.position + len;
		if(max >= this.byteView.length) this.jeashResizeBuffer(max);
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += fcc(c);
			} else if(c < 224) value += fcc((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				value += fcc((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c2 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				value += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,jeashGetEndian: function() {
		if(this.bigEndian == true) return jeash.utils.Endian.BIG_ENDIAN; else return jeash.utils.Endian.LITTLE_ENDIAN;
	}
	,jeashSetEndian: function(endian) {
		if(endian == jeash.utils.Endian.BIG_ENDIAN) this.bigEndian = true; else this.bigEndian = false;
		return endian;
	}
	,jeashGetBuffer: function() {
		return this.data.buffer;
	}
	,__class__: jeash.utils.ByteArray
}
jeash.utils.Endian = $hxClasses["jeash.utils.Endian"] = { __ename__ : ["jeash","utils","Endian"], __constructs__ : ["BIG_ENDIAN","LITTLE_ENDIAN"] }
jeash.utils.Endian.BIG_ENDIAN = ["BIG_ENDIAN",0];
jeash.utils.Endian.BIG_ENDIAN.toString = $estr;
jeash.utils.Endian.BIG_ENDIAN.__enum__ = jeash.utils.Endian;
jeash.utils.Endian.LITTLE_ENDIAN = ["LITTLE_ENDIAN",1];
jeash.utils.Endian.LITTLE_ENDIAN.toString = $estr;
jeash.utils.Endian.LITTLE_ENDIAN.__enum__ = jeash.utils.Endian;
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.prototype = {
	__class__: js.Lib
}
var nme = {}
nme.display = {}
nme.display.FPS = function(inX,inY,inCol) {
	if(inCol == null) inCol = 0;
	if(inY == null) inY = 10.0;
	if(inX == null) inX = 10.0;
	jeash.text.TextField.call(this);
	this.jeashSetX(inX);
	this.jeashSetY(inY);
	this.selectable = false;
	this.jeashSetDefaultTextFormat(new jeash.text.TextFormat("_sans",12,inCol));
	this.SetText("FPS: ");
	this.times = [];
	this.addEventListener(jeash.events.Event.ENTER_FRAME,this.onEnter.$bind(this));
};
$hxClasses["nme.display.FPS"] = nme.display.FPS;
nme.display.FPS.__name__ = ["nme","display","FPS"];
nme.display.FPS.__super__ = jeash.text.TextField;
nme.display.FPS.prototype = $extend(jeash.text.TextField.prototype,{
	times: null
	,onEnter: function(_) {
		var now = haxe.Timer.stamp();
		this.times.push(now);
		while(this.times[0] < now - 1) this.times.shift();
		if(this.jeashGetVisible()) this.SetText("FPS: " + this.times.length);
	}
	,__class__: nme.display.FPS
});
nme.installer = {}
nme.installer.Assets = function() { }
$hxClasses["nme.installer.Assets"] = nme.installer.Assets;
nme.installer.Assets.__name__ = ["nme","installer","Assets"];
nme.installer.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	switch(id) {
	case "graphics/standard/nowloading.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/nowloading.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	case "graphics/standard/themes/theme0/tex_blue0.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/themes/theme0/tex_blue0.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	case "graphics/standard/themes/theme0/tex_blue_house0.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/themes/theme0/tex_blue_house0.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	case "graphics/standard/themes/theme0/tex_red0.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/themes/theme0/tex_red0.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	case "graphics/standard/themes/theme0/tex_red_house0.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/themes/theme0/tex_red_house0.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	case "graphics/standard/themes/theme0/tex_search_obj0.png":
		return ((function($this) {
			var $r;
			var $t = ApplicationMain.loaders.get("graphics/standard/themes/theme0/tex_search_obj0.png").contentLoaderInfo.content;
			if(Std["is"]($t,jeash.display.Bitmap)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).bitmapData;
	}
	return null;
}
nme.installer.Assets.getFont = function(id) {
	switch(id) {
	case "font/yutapon_coding_081.ttf":
		var font = (function($this) {
			var $r;
			var $t = new NME_font_yutapon_coding_081_ttf();
			if(Std["is"]($t,jeash.text.Font)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		return font;
	}
	return null;
}
nme.installer.Assets.getSound = function(id) {
	switch(id) {
	case "bgm/bgm000.mp3":
		return new jeash.media.Sound(new jeash.net.URLRequest("bgm/bgm000.mp3"));
	case "se/coin.wav":
		return new jeash.media.Sound(new jeash.net.URLRequest("se/coin.wav"));
	case "se/jump.wav":
		return new jeash.media.Sound(new jeash.net.URLRequest("se/jump.wav"));
	}
	return null;
}
nme.installer.Assets.prototype = {
	__class__: nme.installer.Assets
}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
haxe.Resource.content = [{ name : "NME_font_yutapon_coding_081_ttf", data : "s114108:cToxMTFveTY6YXNjZW50ZDg4MHk0OmRhdGFhZDI2MmQxMDIyZDIyNmQxMDIyZDE5OGQxMDEwZDE3MGQ5OThkMTM2ZDk2MWQxMDJkOTI0ZDkyZDg3NmQ4MmQ4MjhkODRkNzUwZDg2ZDY3MmQ5OGQ2MzZkMTEwZDYwMGQxNDRkNTYyZDE1OGQ1NTBkMTc0ZDU0M2QxOTBkNTM2ZDIwOGQ1MzJkMjU2ZDUyNmQzMTRkNTMyZDMzNGQ1MzZkMzUxZDU0N2QzNjhkNTU4ZDM5MmQ1ODBkNDEyZDU3MmQ0MjlkNTU5ZDQ0NmQ1NDZkNDYxZDU0OGQ0NzZkNTUwZDQ4MmQ1NTZkNDg4ZDU2MmQ0OTBkNTg0ZDQ3OGQ2MDJkNDU5ZDYxMGQ0NDBkNjE4ZDQyMmQ2MjhkNDQyZDY3OGQ0NDdkNzI2ZDQ1MmQ3NzRkNDQ3ZDgxOGQ0NDJkODYyZDQyMWQ5MDZkNDAwZDk1MGQzNzBkOTc4ZDM0MGQxMDA2ZDMxNWQxMDE0ZDI5MGQxMDIyZDI2MmQxMDIyZDM0MGQ5MjRkMzY0ZDg5NmQzODBkODU1ZDM5NmQ4MTRkMzk0ZDc2N2QzOTJkNzIwZDM4NWQ2OTBkMzc4ZDY2MGQzNjJkNjM0ZDMyMmQ2NDhkMjkyZDY0NmQyNzRkNjMwZDI1NmQ2MTRkMjQwZDU4MGQyMjJkNTg2ZDIwNGQ1ODZkMTg2ZDU4NmQxNzRkNjAyZDE1MmQ2MzZkMTQ1ZDY2OGQxMzhkNzAwZDEzOWQ3NjhkMTQwZDgzNmQxNTJkODY4ZDE2NGQ5MDBkMjA0ZDkzNGQyMjBkOTQyZDIzN2Q5NDhkMjU0ZDk1NGQyODFkOTUyZDMwOGQ5NTBkMzQwZDkyNGh5Njpfd2lkdGhkNTEyeTQ6eE1heGQ0OTB5NDp4TWluZDg0eTQ6eU1heGQ0OTJ5NDp5TWluZDJ5NzpfaGVpZ2h0ZDQwOHk3OmxlYWRpbmdkMHk3OmRlc2NlbnRkMTQ0eTg6Y2hhckNvZGVpMTExeTE1OmxlZnRzaWRlQmVhcmluZ2Q4NHkxMjphZHZhbmNlV2lkdGhkNTEyeTg6Y29tbWFuZHNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIyM29SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIyM1IxMWQwUjEyZDUxMlIxM2FoZzoxMTBvUjBkODgwUjFhZDEzNGQxMDI0ZDExMmQxMDI0ZDEwNmQxMDEwZDEwMmQ5NzZkMTA0ZDgyM2QxMDZkNjcwZDEwNmQ2MTVkMTA2ZDU2MGQxMTBkNTQyZDExNmQ1MThkMTI3ZDUxNWQxMzhkNTEyZDE0NmQ1MTRkMTU0ZDUxNmQxNjBkNTI2ZDE2NmQ1MzZkMTY4ZDU4MmQyMDBkNTQ2ZDIyOWQ1MzRkMjU4ZDUyMmQyODVkNTI3ZDMxMmQ1MzJkMzM5ZDU0NWQzNjZkNTU4ZDM5MmQ1OTRkNDE4ZDYzMGQ0MjNkNjkwZDQyOGQ3NTBkNDMyZDEwMDJkNDMwZDEwMDhkNDI0ZDEwMTRkNDE4ZDEwMjBkNDEyZDEwMjJkMzk2ZDEwMjJkMzkwZDEwMjBkMzg0ZDEwMTRkMzc4ZDEwMDhkMzc2ZDEwMDJkMzcwZDc1OGQzNjZkNzA1ZDM2MmQ2NTJkMzM1ZDYyNWQzMDhkNTk4ZDI5NGQ1OTRkMjgwZDU5MGQyNThkNTkyZDIzNmQ1OTRkMjEyZDYyMGQxODhkNjQ2ZDE2NGQ2NzZkMTY2ZDg2MmQxNjVkOTE5ZDE2NGQ5NzZkMTY0ZDEwMTBkMTU4ZDEwMjRkMTM0ZDEwMjRoUjJkNTEyUjNkNDMyUjRkMTA0UjVkNTEwUjZkMFI3ZDQwNlI4ZDBSOWQxNDRSMTBpMTEwUjExZDEwNFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIyMm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIyMlIxMWQwUjEyZDUxMlIxM2FoZzoxMDlvUjBkODgwUjFhZDIzNGQxMDI0ZDIyMmQxMDEyZDIxOGQ5NzhkMjI0ZDk0OGQyMjRkODM1ZDIyNGQ3MjJkMjE4ZDY4MGQyMTJkNjM4ZDE5MGQ1OTRkMTcwZDU4NmQxNTZkNTkyZDE0OWQ2MDJkMTQyZDYxMmQxMzRkNjI0ZDEyNmQ2MzZkMTE5ZDY0OGQxMTJkNjYwZDEwMmQ2NjZkOThkNzY4ZDEwMGQ4NjVkMTAyZDk2MmQxMDJkMTAwMGQ5OGQxMDA4ZDkzZDEwMTNkODhkMTAxOGQ4MGQxMDIyZDY0ZDEwMjJkNThkMTAyMGQ1MmQxMDE0ZDQ2ZDEwMDhkNDJkOTk0ZDQwZDk2NmQ0MGQ4NjdkNDBkNzY4ZDQ0ZDU4MGQ0MmQ1NTJkNDRkNTQ2ZDUwZDU0MGQ1NmQ1MzRkNjJkNTMyZDc4ZDUzMmQ4NmQ1MzZkOTFkNTQxZDk2ZDU0NmQxMDBkNTU0ZDEwMGQ1ODBkMTE4ZDU1NmQxMzhkNTM5ZDE1OGQ1MjJkMTkyZDUyOGQyMTJkNTM0ZDIyNWQ1NDNkMjM4ZDU1MmQyNTRkNTkyZDMwNGQ1MzJkMzI5ZDUyNWQzNTRkNTE4ZDM3OGQ1MjBkMzk2ZDUyNGQ0MDdkNTM0ZDQxOGQ1NDRkNDMwZDU1OGQ0NTZkNTk0ZDQ2MGQ2MzhkNDY0ZDY4MmQ0NjYuNWQ4MjRkNDY5ZDk2NmQ0NjlkMTAwNmQ0NjdkMTAxMmQ0NjFkMTAxOGQ0NTVkMTAyNGQ0NDBkMTAyNGQ0MjVkMTAyNGQ0MjBkMTAxN2Q0MTVkMTAxMGQ0MTFkMTAwNGQ0MDlkOTYyZDQwOC41ZDgyN2Q0MDhkNjkyZDQwNGQ2NTRkNDAwZDYxNmQzODRkNTg2ZDM3OGQ1ODJkMzcyZDU3OWQzNjZkNTc2ZDM1OGQ1NzhkMzQyZDU4NGQzMzJkNTkzZDMyMmQ2MDJkMzAyZDYyOWQyODJkNjU2ZDI3OWQ2NjBkMjc2ZDY2NGQyNzhkNjcyZDI4MmQ3MzRkMjgxZDg0NGQyODBkOTU0ZDI3OWQ5NzdkMjc4ZDEwMDBkMjY2ZDEwMjBkMjYwZDEwMjRkMjU0ZDEwMjVkMjQ4ZDEwMjZkMjM0ZDEwMjRoUjJkNTEyUjNkNDY5UjRkNDBSNWQ1MDRSNmQtMVI3ZDQ2NFI4ZDBSOWQxNDRSMTBpMTA5UjExZDQwUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIyMW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIyMVIxMWQwUjEyZDUxMlIxM2FoZzoxMDhvUjBkODgwUjFhZDMzNGQxMDIwZDMwOGQxMDEyZDI4NGQxMDAzZDI2MGQ5OTRkMjQwZDk3NGQyMjJkOTU0ZDIxNWQ5MjhkMjA4ZDkwMmQyMDdkODY5ZDIwNmQ4MzZkMjA4ZDc4NmQyMTBkNzM2ZDIwOWQ2MjBkMjA4ZDUwNGQyMDdkNDE1ZDIwNmQzMjZkMjA2ZDIxMmQyMThkMTkwZDIyNGQxODZkMjMwZDE4NWQyMzZkMTg0ZDI0NGQxODRkMjUwZDE4NmQyNTZkMTkyZDI2MmQxOThkMjY0ZDIwNGQyNjJkMzIwZDI2NWQ0MTFkMjY4ZDUwMmQyNjhkNjIxZDI2OGQ3NDBkMjY3ZDc5MmQyNjZkODQ0ZDI2OWQ4NzdkMjcyZDkxMGQyNzVkOTIxZDI3OGQ5MzJkMjg4ZDk0MGQzMDZkOTUyZDMyOGQ5NTZkMzUwZDk2MGQzNjhkOTc0ZDM3MmQ5ODBkMzczZDk4NmQzNzRkOTkyZDM3NGQxMDAwZDM3MmQxMDA2ZDM2NmQxMDEyZDM2MGQxMDE4ZDM1NGQxMDIwZDMzNGQxMDIwaFIyZDUxMlIzZDM3NFI0ZDIwNlI1ZDg0MFI2ZDRSN2Q2MzRSOGQwUjlkMTQ0UjEwaTEwOFIxMWQyMDZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmhnOjIyMG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIyMFIxMWQwUjEyZDUxMlIxM2FoZzoxMDdvUjBkODgwUjFhZDQxNmQxMDI0ZDMwNmQ5MzJkMTQ4ZDgxOGQxNDZkOTY2ZDE0OGQ5ODRkMTQ2ZDEwMTJkMTQ0ZDEwMThkMTM4ZDEwMjJkMTMyZDEwMjZkMTI2ZDEwMjhkMTEwZDEwMjhkODhkMTAxMmQ4NmQ5NjZkODdkNzY1ZDg4ZDU2NGQ4NmQ0MzVkODRkMzA2ZDg2ZDI3NmQ4OGQyNzBkOTRkMjY0ZDEwMGQyNThkMTA2ZDI1NmQxMjRkMjU2ZDEzMGQyNThkMTM2ZDI2NGQxNDJkMjcwZDE0NGQyNzZkMTQwZDMwNmQxNDJkNDM2ZDE0NGQ1NjZkMTQ4ZDcxMmQyMDJkNjYwZDI1NWQ2MTBkMzA4ZDU2MGQzNjRkNTE4ZDM4OGQ1MThkMzk0ZDUyMGQ0MDBkNTI2ZDQwNmQ1MzJkNDA4ZDUzOGQ0MDhkNTUyZDQwNmQ1NThkNDAwZDU2NGQzOTRkNTcwZDM4OGQ1NzJkMzc4ZDU3NmQzNDRkNjA4ZDMxMGQ2NDBkMjY2ZDY4MGQyMjJkNzIwZDE4MGQ3NzBkMzM4ZDg5MGQ0NThkOTg4ZDQ2NGQxMDA4ZDQ1NGQxMDE3ZDQ0NGQxMDI2ZDQxNmQxMDI0aFIyZDUxMlIzZDQ1OFI0ZDg2UjVkNzY4UjZkLTRSN2Q2ODJSOGQwUjlkMTQ0UjEwaTEwN1IxMWQ4NlIxMmQ1MTJSMTNhaTFpM2kzaTJpM2kzaTJpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2hnOjIxOW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIxOVIxMWQwUjEyZDUxMlIxM2FoZzoxMDZvUjBkODgwUjFhZDY1ZDkxMGQ3MGQ4ODRkODEuNWQ4NjcuNWQ5M2Q4NTFkMTA4ZDg0NWQxMjNkODQwZDE0MGQ4NDhkMTU5ZDg2NGQxNTFkODg3ZDE0NGQ4OTVkMTMxZDkwOWQxMjZkOTI5ZDEyMWQ5NDZkMTIyZDk2NWQxMjJkOTc1ZDEyNWQ5ODVkMTI4ZDk5N2QxMzVkMTAwNmQxNDJkMTAxNWQxNTJkMTAyMWQxNzBkMTAzMWQxODVkMTAzMy41ZDIwMGQxMDM2ZDIyMGQxMDM0ZDI0MGQxMDMyZDI1NGQxMDI0ZDI2OGQxMDE2ZDI4MmQxMDAwZDI5NmQ5ODRkMjk5ZDk1OWQzMDJkOTM0ZDMwM2Q4NDdkMzA0ZDc2MGQzMDdkNzAzZDMxMGQ2NDZkMzA4ZDU4OGQzMDZkNTc0ZDMxOGQ1NDhkMzI0ZDU0NGQzNDRkNTQyZDM2NGQ1NDRkMzY2ZDU2MmQzNzBkNjQ0ZDM2N2Q3MTBkMzY0ZDc3NmQzNjJkODYzZDM2MGQ5NTBkMzU1ZDk5MmQzNTBkMTAzNGQzMDRkMTA2NGQyODBkMTA4MGQyNTZkMTA4OWQyMzJkMTA5OGQyMDRkMTA5OGQxNzRkMTA5OWQxNDBkMTA4NGQxMjFkMTA3NmQxMDRkMTA2MmQ4OGQxMDQ4ZDc5ZDEwMzJkNjJkMTAwOWQ2MWQ5NTJkNjBkOTMyZDY1ZDkxMGQzMjBkMzkyZDI2OGQzODRkMjQyZDM1MGQyMjhkMzI0ZDIzNGQyOTRkMjQ0ZDI3MmQyNThkMjU4ZDI5NmQyMjhkMzUyZDIzMGQzODhkMjM0ZDQxNmQyNTZkNDQwZDI3NmQ0NDBkMzEyZDQzOGQzNDRkNDE4ZDM2NGQzNzRkMzkyZDMyMGQzOTJoUjJkNTEyUjNkNDQwUjRkNjFSNWQ3OTRSNmQtNzRSN2Q3MzNSOGQwUjlkMTQ0UjEwaTEwNlIxMWQ2MVIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzoyMThvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMThSMTFkMFIxMmQ1MTJSMTNhaGc6MTA1b1IwZDg4MFIxYWQyNjRkMTAyNmQyNTZkMTAyNGQyNTFkMTAyMWQyNDZkMTAxOGQyNDRkMTAxMGQyMzJkOTMyZDIzMGQ4NjJkMjI4ZDc5MmQyMzBkNzI2ZDIzMmQ2NjBkMjMzZDYyNGQyMzRkNTg4ZDI0NGQ1NTJkMjUwZDU0OGQyNThkNTQ1ZDI2NmQ1NDJkMjc0ZDU0NGQyODBkNTQ2ZDI4NmQ1NTJkMjkyZDU1OGQyOTFkNTg2ZDI5MGQ2MTRkMjg5ZDY0M2QyODhkNjcyZDI4OGQ3NDFkMjg4ZDgxMGQyOTFkODgwZDI5NGQ5NTBkMzAwZDEwMTBkMjk4ZDEwMThkMjkzZDEwMjFkMjg4ZDEwMjRkMjgwZDEwMjZkMjY0ZDEwMjZkMjUwZDQwNmQyMjRkNDAyZDIwNmQzOTJkMTg0ZDM4MGQxNzRkMzYwZDE2MmQzMzhkMTY2ZDMxMmQxNzRkMjc2ZDE5OGQyNjBkMjEyZDI1MGQyMjhkMjQ2ZDI1NGQyNDJkMjgyZDI0NGQzMDBkMjQ2ZDMxNGQyNTJkMzMyZDI2MmQzNDJkMjc0ZDM1NmQyOTJkMzYyZDMxNGQzNjZkMzMwZDM2MmQzNDhkMzU2ZDM2OGQzMzhkMzg0ZDMxOGQ0MDJkMjkyZDQwNmQyNzBkNDA4ZDI1MGQ0MDZoUjJkNTEyUjNkMzYyUjRkMTY2UjVkNzgwUjZkLTJSN2Q2MTRSOGQwUjlkMTQ0UjEwaTEwNVIxMWQxNjZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMTdvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMTdSMTFkMFIxMmQ1MTJSMTNhaGc6MTA0b1IwZDg4MFIxYWQzOTJkMTAyNGQzODBkMTAxNGQzNzhkOTkwZDM4MGQ5NDJkMzgyZDg4OWQzODRkODM2ZDM4MWQ3OTFkMzc4ZDc0NmQzNjhkNzE5ZDM1OGQ2OTJkMzQxZDY3NGQzMjRkNjU2ZDMwNWQ2NTFkMjg2ZDY0NmQyNjRkNjQ5ZDI0MmQ2NTJkMjIxZDY2MGQyMDBkNjY4ZDE3MGQ2OThkMTY4ZDc4MmQxNjZkODYzZDE2NGQ5NDRkMTYyZDEwMjBkMTYwZDEwMjRkMTQ0ZDEwMjZkMTM4ZDEwMjZkMTMwZDEwMjZkMTIwZDEwMjZkMTE0ZDEwMjRkMTA2ZDEwMjJkMTA0ZDEwMTZkMTA4ZDkwMGQxMTAuNWQ4MDVkMTEzZDcxMGQxMTRkNjQ4ZDExNWQ1ODZkMTE0LjVkNDUxZDExNGQzMTZkMTEyZDI4MGQxMjRkMjU4ZDEzMGQyNTRkMTM2ZDI1M2QxNDJkMjUyZDE1MGQyNTJkMTU2ZDI1NGQxNjJkMjYwZDE2OGQyNjZkMTc0ZDI4MGQxNzRkMzE2ZDE3MmQ2MjZkMjA2ZDYwNmQyMzdkNTk2ZDI2OGQ1ODZkMzAwZDU5MWQzMzJkNTk2ZDM1NWQ2MDZkMzc4ZDYxNmQzOTZkNjQyZDQxNGQ2NjhkNDI2ZDcwM2Q0MzhkNzM4ZDQ0MWQ3ODhkNDQ0ZDgzOGQ0NDRkODc5ZDQ0NGQ5MjBkNDQyZDk1MWQ0NDBkOTgyZDQyNGQxMDIyZDQxOGQxMDI0ZDQxMmQxMDI0ZDQwNmQxMDI0ZDM5MmQxMDI0aFIyZDUxMlIzZDQ0NFI0ZDEwNFI1ZDc3MlI2ZC0yUjdkNjY4UjhkMFI5ZDE0NFIxMGkxMDRSMTFkMTA0UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIxNm9SMGQ4ODBSMWFkMjU0ZDEwMjJkMjI0ZDEwMjJkMTgyZDEwMDZkMTQwZDk5MGQxMDJkOTQ2ZDY0ZDkwMmQ0OWQ4MzZkMzRkNzcwZDM2ZDY3NWQzOGQ1ODBkNjJkNDgxZDg2ZDM4MmQxMjVkMzMwZDE2NGQyNzhkMjA1ZDI2NGQyNDZkMjUwZDI4M2QyNTZkMzIwZDI2MmQzNTFkMjg1ZDM4MmQzMDhkNDA0ZDM1MmQ0MjBkMzg2ZDQyNmQ0MDZkNDQ0ZDQ4MmQ0NTBkNTI5ZDQ1NmQ1NzZkNDU2ZDY5NWQ0NTZkODE0ZDQzNWQ4NzNkNDE0ZDkzMmQzNzlkOTY2ZDM0NGQxMDAwZDMxN2QxMDExZDI5MGQxMDIyZDI1NGQxMDIyZDI5MGQ5NThkMzMyZDkzOGQzNTFkOTExZDM3MGQ4ODRkMzc5ZDg1OWQzODhkODM0ZDM5M2Q4MTJkMzk4ZDc5MGQzOTlkNzMyZDQwMGQ2NzRkMzk5ZDYyMWQzOThkNTY4ZDM5MmQ1MjBkMzg2ZDQ3MmQzNzRkNDI0ZDM2NGQzOTBkMzUwZDM2NGQzMzRkMzM2ZDMxNC41ZDMyMmQyOTVkMzA4ZDI4My41ZDMwNC41ZDI3MmQzMDFkMjU4ZDMwMmQyMzNkMzA1ZDIxN2QzMTVkMTkyZDMyOGQxNzZkMzQ5ZDEzMmQ0MTZkMTEzZDUwNmQ5NGQ1OTZkOTNkNjg5ZDkyZDc4MmQxMDhkODMzZDEyNGQ4ODRkMTU3ZDkxNWQxOTBkOTQ2ZDIxNGQ5NTVkMjM4ZDk2NGQyNjRkOTY0ZDI5MGQ5NThkOTVkMTA4OGQ0NGQxMDY5ZDM1NWQzMzRkNDEyZDE5OWQ0NjFkMjE1ZDM5OWQzNjNkOTVkMTA4OGhSMmQ1MTJSM2Q0NjFSNGQzNlI1ZDgyNVI2ZC02NFI3ZDc4OVI4ZDBSOWQxNDRSMTBpMjE2UjExZDM2UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkyaTJpMmkyaTJpMmhnOjEwM29SMGQ4ODBSMWFkMjM0ZDExNDRkMTk5ZDExMzdkMTY0ZDExMTJkMTM3ZDEwODlkMTI3ZDEwNTdkMTExZDEwMDhkMTM2ZDk2NGQxNzFkOTQyZDE4MGQ5ODBkMTY2ZDEwMDdkMTcwZDEwMzRkMTc2ZDEwNTZkMTkyZDEwNjhkMjE0ZDEwODZkMjMyZDEwODhkMjcwZDEwOTdkMzA2ZDEwODZkMzM4ZDEwNzdkMzU5ZDEwNDlkMzc5ZDEwMTVkMzgyZDk3NGQzODhkOTE5ZDM4OGQ4MjhkMzM3ZDg1N2QyOTVkODY0ZDI0MWQ4NzNkMTg4ZDg1MGQxNjBkODM2ZDE0NmQ4MjVkMTMyZDgxNGQxMTZkNzkzZDEwMGQ3NzJkOTBkNzQ5ZDgwZDcyNmQ4MGQ2OTBkODRkNjU0ZDk4ZDYyOGQxMTJkNjAyZDEzMmQ1ODRkMTY4ZDU1MmQyMTJkNTM2ZDI1NmQ1MjBkMzAwZDUyNmQzMjJkNTI4ZDM1NmQ1NDBkMzk4ZDU2MmQ0MTZkNTg0ZDQzOGQ2MTBkNDQyZDY1MGQ0NDNkNjgwZDQ0M2Q3MTVkNDQzZDc1MGQ0NDJkODA0ZDQ0MWQ4NjhkNDM4ZDkyMGQ0MzVkOTY4ZDQzMi41ZDk5MmQ0MzBkMTAxNmQ0MjUuNWQxMDM0ZDQyMWQxMDUyZDQwNy41ZDEwNzNkMzk0ZDEwOTRkMzY4ZDExMTJkMzQyZDExMzBkMzE0ZDExMzlkMjg2ZDExNDhkMjM0ZDExNDRkMzI0ZDc5NmQzNDhkNzg4ZDM2MGQ3NzZkMzcyZDc2NGQzODJkNzQyZDM4OGQ3MTZkMzg4ZDY5NmQzODhkNjc2ZDM4NmQ2NjBkMzg0ZDY0NGQzNzhkNjMyZDM3MmQ2MjBkMzU0ZDYwNmQzMzZkNTkyZDMwNGQ1ODZkMjgwZDU4MmQyNTRkNTg3ZDIyOGQ1OTJkMjAzZDYwNWQxNzhkNjE4ZDE1OGQ2NDJkMTM4ZDY2NGQxMzdkNzAwZDEzNmQ3MzZkMTYyZDc2MmQxOTZkNzkyZDIyNmQ4MDFkMjU2ZDgxMGQyOTBkODA0ZDMyNGQ3OTZoUjJkNTEyUjNkNDQzUjRkODBSNWQ0OThSNmQtMTIwUjdkNDE4UjhkMFI5ZDE0NFIxMGkxMDNSMTFkODBSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzoyMTVvUjBkODgwUjFhZDc3OGQ5MjhkNzYyZDkyNmQ3NDlkOTE0ZDczNmQ5MDJkNzIyZDg5MGQ1MDhkNjkyZDI5NmQ5MDJkMjg2ZDkxMmQyNzRkOTE4ZDI2MmQ5MjRkMjQ2ZDkyMmQyMjZkOTEyZDIyMGQ5MDRkMjE3ZDg5NWQyMTRkODg2ZDIxNmQ4NzZkMjMwZDg1MGQyNDZkODQyZDQ1MmQ2MzRkMjU0ZDQ0NmQyMzJkNDIwZDIzMGQzOTZkMjQwZDM3NmQyNDhkMzcwZDI1N2QzNjdkMjY2ZDM2NGQyNzZkMzY2ZDMwNGQzODJkMzA4ZDM5MmQ1MTBkNTc4ZDcyNmQzNzJkNzU4ZDM3MGQ3NzhkMzgwZDc4NGQzODhkNzg3ZDM5N2Q3OTBkNDA2ZDc4OGQ0MThkNzc4ZDQzOGQ1NzBkNjMwZDgwOGQ4NjBkODE0ZDg2OGQ4MTdkODc3ZDgyMGQ4ODZkODE4ZDg5NmQ4MDhkOTE2ZDgwMmQ5MjJkNzk0ZDkyNGQ3ODZkOTI2ZDc3OGQ5MjhoUjJkMTAyNFIzZDgxOFI0ZDIxNlI1ZDY1OFI2ZDk2UjdkNDQyUjhkMFI5ZDE0NFIxMGkyMTVSMTFkMjE2UjEyZDEwMjRSMTNhaTFpM2kzaTJpMmkzaTNpMmkzaTNpMmkzaTJpMmkyaTJpM2kzaTJpMmkyaTNpMmkzaTNpMmkyaTJpM2kzaTJpM2kzaGc6MTAyb1IwZDg4MFIxYWQxOThkMTAyNGQxOTJkMTAyMmQxODZkMTAxNmQxODBkMTAxMGQxNzZkOTkyZDE4MmQ5NjJkMTg0ZDkzMWQxODZkOTAwZDE4NWQ4NTRkMTg0ZDgwOGQxODRkNTk4ZDk4ZDYwMGQ3OGQ2MDBkNjRkNTk0ZDYxZDU4MmQ1OGQ1NzBkNjFkNTYzZDY0ZDU1NmQ3MGQ1NTBkNzZkNTQ0ZDgyZDU0MmQxMDJkNTQ0ZDE4NGQ1NDBkMTg2ZDM4NmQxOTBkMzUxZDE5NGQzMTZkMjI4ZDI4NmQyNDJkMjc2ZDI1NWQyNzFkMjY4ZDI2NmQyOTJkMjYwZDMzNGQyNTRkNDIyZDI1MmQ0MjhkMjU0ZDQzNGQyNjBkNDQwZDI2NmQ0NDJkMjcyZDQ0MmQyODhkNDQwZDI5NGQ0MzRkMzAwZDQyOGQzMDZkNDIyZDMwOGQ0MTJkMzEwZDMzNGQzMTJkMjkyZDMxOGQyNzRkMzI0ZDI2OWQzMjhkMjY0ZDMzMmQyNTZkMzQwZDI0NmQzNjRkMjQ0ZDM4M2QyNDJkNDAyZDI0MmQ1NDBkMjk0ZDU0MGQzOTJkNTM2ZDM5OGQ1MzhkNDA0ZDU0NGQ0MTBkNTUwZDQxMGQ1NjRkNDEwZDU3OGQ0MDRkNTg0ZDM5OGQ1OTBkMzkyZDU5MmQzMzBkNTk2ZDI0MmQ1OThkMjQyZDgwOGQyNDJkODU3ZDI0MmQ5MDZkMjQxZDk0NmQyNDBkOTg2ZDIyNGQxMDE4ZDIxOGQxMDIyZDIxMmQxMDIzZDIwNmQxMDI0ZDE5OGQxMDI0aFIyZDUxMlIzZDQ0MlI0ZDYxUjVkNzcyUjZkMFI3ZDcxMVI4ZDBSOWQxNDRSMTBpMTAyUjExZDYxUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTJpM2kzaTJpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpMmkyaTNpM2kzaTNpM2hnOjIxNG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIxNFIxMWQwUjEyZDUxMlIxM2FoZzoxMDFvUjBkODgwUjFhZDI0NGQxMDI0ZDIxMGQxMDE4ZDE4N2QxMDA4ZDE2NGQ5OThkMTQ1ZDk4OGQxMjZkOTc4ZDk3ZDk0N2Q2OGQ5MTZkNTlkODg0ZDUwZDg1MmQ1M2Q3OTlkNTZkNzQ2ZDcxZDcxMGQ4NmQ2NzRkOTlkNjQ3ZDExMmQ2MjBkMTUyZDU4M2QxOTJkNTQ2ZDIyM2Q1MzhkMjU0ZDUzMGQyOTBkNTM0ZDMyNmQ1MzhkMzU1ZDU1M2QzODRkNTY4ZDQxMGQ1OTdkNDM2ZDYyNmQ0NDJkNjY3ZDQ0OGQ3MDhkNDUyZDc0OGQ0NTBkNzU0ZDQ0NGQ3NjFkNDM4ZDc2OGQ0MzJkNzcwZDM2MGQ3NzZkMjY0ZDc3OWQxNjhkNzgyZDExOGQ3NzRkMTE0ZDc4NmQxMTJkODA4ZDExMGQ4MzBkMTEyZDg0OGQxMTRkODY2ZDEyMGQ4ODFkMTI2ZDg5NmQxNTFkOTE2ZDE3NmQ5MzZkMTkxZDk0M2QyMDZkOTUwZDIyOGQ5NjBkMjUwZDk3MGQyOTJkOTYyZDMzNGQ5NTRkMzY0ZDkzNGQzOTRkOTE0ZDQyOGQ5MDZkNDM0ZDkwOGQ0NDBkOTE0ZDQ0NmQ5MjBkNDQ4ZDkyNmQ0NDhkOTQ0ZDQyOGQ5NzBkNDAwZDk4NmQzNzJkMTAwMmQzNDdkMTAxM2QzMjJkMTAyNGQyOThkMTAyNGQyNzRkMTAyNGQyNDRkMTAyNGQzOTBkNzE0ZDM4OGQ2NzJkMzc4ZDY1MmQzNjhkNjMyZDM0OGQ2MTRkMzI4ZDU5NmQzMDBkNTkwZDI3MmQ1ODRkMjUzZDU4N2QyMzRkNTkwZDIxMGQ2MDdkMTg2ZDYyNGQxNzJkNjQyZDE1OGQ2NjBkMTUwZDY3NmQxNDJkNjkyZDEzNmQ3MjBkMTcyZDcyMmQyNjZkNzIwZDM2MGQ3MThkMzkwZDcxNGhSMmQ1MTJSM2Q0NTJSNGQ1M1I1ZDQ5MFI2ZDBSN2Q0MzdSOGQwUjlkMTQ0UjEwaTEwMVIxMWQ1M1IxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMTNvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMTNSMTFkMFIxMmQ1MTJSMTNhaGc6MTAwb1IwZDg4MFIxYWQzMzBkMTAyNmQyNTZkMTAyMmQxOTNkMTAwMGQxMzBkOTc4ZDkxZDkzOGQ1MmQ4OThkNDVkODY1ZDM4ZDgzMmQ0MGQ3OTJkNDJkNzUyZDU3ZDcxMGQ3MmQ2NjhkMTAzZDYzMmQxMzRkNTk2ZDE3M2Q1ODVkMjEyZDU3NGQyNTJkNTc2ZDI5MmQ1NzhkMzIwZDU4MmQzNDhkNTg2ZDM3NGQ1OTZkMzc0ZDU0NGQzNzZkMjgyZDM4OGQyNjBkMzk0ZDI1NmQ0MDBkMjU1ZDQwNmQyNTRkNDE0ZDI1NGQ0MjBkMjU2ZDQyNmQyNjJkNDMyZDI2OGQ0MzRkMjc0ZDQzMmQzMDBkNDMzZDQyM2Q0MzRkNTQ2ZDQzMWQ2MzlkNDI4ZDczMmQ0MjhkOTY2ZDQzNmQ5NjZkNDQyZDk2OGQ0NDhkOTcwZDQ1MmQ5NzZkNDU2ZDk4MmQ0NTdkOTg4ZDQ1OGQ5OTRkNDU4ZDEwMDJkNDU2ZDEwMDhkNDUwZDEwMTRkNDQ0ZDEwMjBkNDM4ZDEwMjJkMzMwZDEwMjZkMzcwZDk2MGQzNzBkNzI0ZDM3MmQ2NTRkMzM2ZDYzMmQyOTFkNjMwZDI0NmQ2MjhkMjE5ZDYzMGQxOTJkNjMyZDE3M2Q2NDNkMTU0ZDY1NGQxMzZkNjc5ZDExOGQ3MDRkMTA2ZDc0MGQ5NGQ3NzZkOTVkODA0ZDk2ZDgzMmQxMDRkODUyZDExMmQ4NzJkMTQ2ZDkwMWQxODBkOTMwZDI0MGQ5NDZkMzAwZDk2MmQzNzBkOTYwaFIyZDUxMlIzZDQ1OFI0ZDQwUjVkNzcwUjZkLTJSN2Q3MzBSOGQwUjlkMTQ0UjEwaTEwMFIxMWQ0MFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjEyb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjEyUjExZDBSMTJkNTEyUjEzYWhnOjk5b1IwZDg4MFIxYWQyNTRkMTAyNGQyMTRkMTAyMmQxNzlkMTAwNWQxNDRkOTg4ZDEwOGQ5NTFkNzJkOTE0ZDU3ZDg1N2Q0MmQ4MDBkNDdkNzQ2ZDUyZDY5MmQ3MmQ2NTJkOTJkNjEyZDEyNWQ1ODFkMTU4ZDU1MGQxOTlkNTM4ZDI0MGQ1MjZkMjc1ZDUyNmQzMTBkNTI2ZDMzNGQ1MzVkMzU4ZDU0NGQzNzlkNTU5ZDQwMGQ1NzRkNDE0ZDU5MWQ0MjhkNjA4ZDQzOGQ2MzBkNDQyZDY0NGQ0MzlkNjUxZDQzNmQ2NThkNDI4ZDY2NGQ0MTZkNjY2ZDQwNGQ2NjRkMzk4ZDY2MGQzOTJkNjU2ZDM4NmQ2NDZkMzY4ZDYxOGQzNTRkNjA3ZDM0MGQ1OTZkMzI2ZDU5MGQzMTJkNTg0ZDI5MmQ1ODJkMjcyZDU4MGQyNDhkNTgzZDIyNGQ1ODZkMTk5ZDU5NmQxNzRkNjA2ZDE1M2Q2MzJkMTMyZDY1OGQxMTdkNjk3ZDEwMmQ3MzZkMTA0ZDc4MWQxMDZkODI2ZDEyMWQ4NjVkMTM2ZDkwNGQxNjZkOTI3ZDE5NmQ5NTBkMjI4ZDk1OWQyNjBkOTY4ZDI4M2Q5NjVkMzA2ZDk2MmQzMjdkOTUyZDM0OGQ5NDJkMzU4ZDkzM2QzNjhkOTI0ZDM3NGQ5MTdkMzgwZDkxMGQzOTJkODk2ZDQwNGQ4ODJkNDIwZDg4OGQ0MzhkODk2ZDQzNGQ5MTZkNDI2ZDkzNmQ0MTRkOTUyZDQwMmQ5NjhkMzgwZDk4NmQzNThkMTAwNGQzMjdkMTAxNWQyOTZkMTAyNmQyNTRkMTAyNGhSMmQ1MTJSM2Q0MzlSNGQ0N1I1ZDQ5OFI2ZDBSN2Q0NTFSOGQwUjlkMTQ0UjEwaTk5UjExZDQ3UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIxMW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIxMVIxMWQwUjEyZDUxMlIxM2FoZzo5OG9SMGQ4ODBSMWFkOTRkMTAyNmQ3MmQxMDI2ZDYwZDEwMDZkNTJkOTk2ZDUyZDk3NmQ1NGQ5NjRkNzhkOTU2ZDgwZDg4MGQ4MmQ4MDJkODRkNzI0ZDg3ZDY3M2Q5MGQ2MjJkODlkNDc0ZDg4ZDMyNmQ4NGQzMDhkODBkMjkwZDgwZDI3NGQ4NGQyNThkMTAwZDI1NGQxMDhkMjUyZDExNmQyNTRkMTMyZDI1OGQxMzZkMjc0ZDE0MmQzMjRkMTQyZDU5NmQxNjhkNTkyZDIwMWQ1ODlkMjM0ZDU4NmQyNzVkNTkwZDMxNmQ1OTRkMzQ3ZDYwNmQzNzhkNjE4ZDQxMmQ2NTBkNDQ2ZDY4MmQ0NjJkNzI2ZDQ3OGQ3NzBkNDcyZDgxM2Q0NjZkODU2ZDQ0N2Q4ODVkNDI4ZDkxNGQzOThkOTM0ZDM4OGQ5NDJkMzUyZDk2NGQzMTZkOTg2ZDI0N2QxMDAzZDE3OGQxMDIwZDk0ZDEwMjZkMzcwZDg4OGQzOTJkODY2ZDQwNWQ4MzZkNDE4ZDgwNmQ0MTVkNzc1ZDQxMmQ3NDRkMzk4ZDcyMWQzODRkNjk4ZDM2NmQ2ODNkMzQ4ZDY2OGQzMjZkNjYwZDMwNGQ2NTJkMjY5ZDY0OGQyMzRkNjQ0ZDE5OWQ2NDdkMTY0ZDY1MGQxNDZkNjYwZDE0MmQ3MzZkMTQwZDgxMWQxMzhkODg2ZDEzOGQ5MDNkMTM2ZDk2MmQxOTZkOTU2ZDI0NWQ5NDNkMjk0ZDkzMGQzMjhkOTEyZDM2MmQ4OTRkMzcwZDg4OGhSMmQ1MTJSM2Q0NzJSNGQ1MlI1ZDc3MFI2ZC0yUjdkNzE4UjhkMFI5ZDE0NFIxMGk5OFIxMWQ1MlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaGc6MjEwb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjEwUjExZDBSMTJkNTEyUjEzYWhnOjk3b1IwZDg4MFIxYWQyOTBkMTAyNGQyMzBkMTAyMmQxODJkMTAwNGQxMzRkOTg2ZDEwM2Q5NTdkNzJkOTI4ZDY0ZDkwOGQ1NmQ4ODhkNjBkODU4ZDY0ZDgyOGQ4MGQ4MDdkOTZkNzg2ZDEyNmQ3NjJkMTU2ZDczOGQxOTZkNzIzZDIzNmQ3MDhkMjg5ZDcwNmQzNDJkNzA0ZDM3MGQ3MDRkMzY0ZDY2MGQzNTVkNjQzZDM0NmQ2MjZkMzI2ZDYxMGQzMDRkNTk4ZDI3OWQ1OTJkMjU0ZDU4NmQyMjZkNTg0ZDE5NmQ1ODRkMTc4ZDU4OWQxNjBkNTk0ZDE0MGQ2MTZkMTM0ZDYyNGQxMjhkNjM0ZDEyMmQ2NDRkMTEwZDY0OGQxMDBkNjUwZDg4ZDY0OGQ3NmQ2NDZkNzRkNjM2ZDcyZDYyNmQ3NGQ2MThkODBkNjAwZDkzZDU4N2QxMDZkNTc0ZDEzNmQ1NTRkMTY4ZDUzOGQxOTlkNTM1ZDIzMGQ1MzJkMjkwZDU0MGQzMThkNTQ2ZDM0MmQ1NTdkMzY2ZDU2OGQzODhkNTg4ZDQyNGQ2MjZkNDMzZDY4NWQ0NDJkNzQ0ZDQ0MWQ4MTZkNDQwZDg4OGQ0MzhkOTEyZDQzNmQ5MzZkNDMwZDk1NmQ0NTJkOTU0ZDQ3MmQ5NThkNDc1ZDk3MGQ0NzhkOTgyZDQ3MmQ5OTFkNDY2ZDEwMDBkNDM3ZDEwMDdkNDA4ZDEwMTRkMzY5ZDEwMjFkMzMwZDEwMjhkMjkwZDEwMjRkMzcyZDk2MGQzNzZkOTQ0ZDM3OGQ5MjZkMzgwZDkwNWQzODJkODg0ZDM4MGQ3NThkMzQ4ZDc1OGQyOTdkNzU5ZDI0NmQ3NjBkMjE2ZDc3MWQxODZkNzgyZDE2MGQ4MDFkMTM0ZDgyMGQxMjVkODM1ZDExNmQ4NTBkMTE2ZDg2NWQxMTZkODgwZDEyNGQ4OTVkMTMyZDkxMGQxNjFkOTI5ZDE5MGQ5NDhkMjM3ZDk1OWQyODRkOTcwZDMzNmQ5NjhkMzcyZDk2MGhSMmQ1MTJSM2Q0NzVSNGQ2MFI1ZDQ4OVI2ZDBSN2Q0MjlSOGQwUjlkMTQ0UjEwaTk3UjExZDYwUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzoyMDlvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDlSMTFkMFIxMmQ1MTJSMTNhaGc6OTZvUjBkODgwUjFhZDMzNmQzOThkMzE2ZDM5MmQyOThkMzcxZDI4MGQzNTBkMjI4ZDI5NmQxNzZkMjQyZDE1MGQyMTJkMTQ2ZDIwMmQxNDhkMTk0ZDE1MmQxNzhkMTY4ZDE3MmQxNzZkMTcwZDE4NmQxNzRkMjM0ZDIxNmQyNzlkMjY2ZDMyNGQzMTZkMzcwZDM2MmQzNzRkMzcwZDM3MGQzODJkMzY0ZDM5NmQzNTBkMzk4ZDM0NGQ0MDBkMzM2ZDM5OGhSMmQ1MTJSM2QzNzBSNGQxNDhSNWQ4NTJSNmQ2MjZSN2Q3MDRSOGQwUjlkMTQ0UjEwaTk2UjExZDE0OFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjA4b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjA4UjExZDBSMTJkNTEyUjEzYWhnOjk1b1IwZDg4MFIxYWQ2MmQxMDI0ZDUyZDEwMTlkNTBkMTAxM2Q0NWQ5OTZkNTBkOTgxZDUzZDk3NWQ2MmQ5NzBkMzI5ZDk3MGQzNzkuNWQ5NzBkNDMwZDk3MGQ0NTRkOTc0ZDQ2M2Q5NzlkNDY2ZDk4NWQ0NzBkOTk4ZDQ2NmQxMDE0ZDQ2M2QxMDIxZDQ1NGQxMDI4ZDQzMGQxMDI0ZDM3OWQxMDI0ZDMyOGQxMDI0ZDYyZDEwMjRoUjJkNTEyUjNkNDY2UjRkNTBSNWQ1NFI2ZC00UjdkNFI4ZDBSOWQxNDRSMTBpOTVSMTFkNTBSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMDdvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDdSMTFkMFIxMmQ1MTJSMTNhaGc6OTRvUjBkODgwUjFhZDQwMGQ0MjhkMzkyZDQyMmQzNzFkNDAxZDM1MGQzODBkMzE0ZDM0MGQyNzhkMzAwZDIzNmQyNTRkMTk2ZDI5OGQxNjVkMzM2ZDEzNGQzNzRkMTE5ZDM5M2QxMDRkNDEyZDkwZDQyNGQ4MGQ0MjhkNjhkNDI0ZDU0ZDQxOGQ1MmQ0MDRkNTBkMzk2ZDU0ZDM4MmQ2MGQzNzZkNzdkMzUzZDk0ZDMzMGQxMzhkMjc5ZDE4MmQyMjhkMjIyZDE4NmQyMzRkMTc0ZDI0NGQxODZkMjkyZDIzMGQzMzlkMjg0ZDM4NmQzMzhkNDA3ZDM1OGQ0MjhkMzc4ZDQzNmQzODhkNDQwZDM5OGQ0MzZkNDA4ZDQzMmQ0MjRkNDE2ZDQyOGQ0MDhkNDMwZDQwMGQ0MjhoUjJkNTEyUjNkNDM2UjRkNTJSNWQ4MzhSNmQ1OTZSN2Q3ODZSOGQwUjlkMTQ0UjEwaTk0UjExZDUyUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjA2b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjA2UjExZDBSMTJkNTEyUjEzYWhnOjkzb1IwZDg4MFIxYWQyOTRkMTExNGQxMzZkMTExMmQxMjJkMTExMGQxMTRkMTEwMGQxMDRkMTA4OGQxMDhkMTA3NGQxMTJkMTA1OGQxMjhkMTA1NGQyODhkMTA1NGQyOTBkMTAzNGQyODYuNWQ4NzVkMjgzZDcxNmQyODAuNWQ2MTFkMjc4ZDUwNmQyNzhkMjY4ZDE3NGQyNjZkMTQwZDI2NmQxMzBkMjY1ZDEyMGQyNjRkMTA4ZDI1MmQxMDBkMjQyZDEwMmQyMjZkMTA4ZDIxMmQxMjJkMjA2ZDEzMmQyMDZkMTcyZDIwNmQyNzZkMjEwZDI5OWQyMTFkMzIyZDIxMmQzMjhkMjIwZDMzOGQyMjhkMzM3ZDI1N2QzMzZkMjg2ZDMzN2Q0MDNkMzM4ZDUyMGQzMzkuNWQ2MjFkMzQxZDcyMmQzNDQuNWQ4NzhkMzQ4ZDEwMzRkMzQ4ZDEwNDhkMzQ4ZDEwNjJkMzQ3ZDEwNzhkMzQ2ZDEwOTRkMzM0ZDExMDZkMzI2ZDExMTJkMzE2ZDExMTNkMzA2ZDExMTRkMjk0ZDExMTRoUjJkNTEyUjNkMzQ4UjRkMTAyUjVkODE4UjZkLTkwUjdkNzE2UjhkMFI5ZDE0NFIxMGk5M1IxMWQxMDJSMTJkNTEyUjEzYWkxaTJpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMDVvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDVSMTFkMFIxMmQ1MTJSMTNhaGc6OTJvUjBkODgwUjFhZDI0NmQxMDU2ZDIzMmQxMDU0ZDIyNmQxMDM2ZDIyNGQxMDIyZDIyOGQ4OTRkMjMwZDg0MGQxODhkODM4ZDg0ZDg0OGQ2MmQ4NDZkNjBkODMyZDU4ZDgyMmQ2MGQ4MTJkNjRkNzk4ZDgwZDc5MGQyMzJkNzgyZDIzMmQ2OThkMjA0ZDcwMGQ4MGQ3MDZkNjRkNzA0ZDYwZDY4NmQ1OGQ2NzZkNjBkNjY4ZDY0ZDY1MmQ4MGQ2NDZkMjM0ZDYzOGQxNzZkNTQ0ZDEyOWQ0NTNkODJkMzYyZDU5ZDMxOGQzNmQyNzRkMzRkMjYyZDMyZDI0OGQ0NGQyMzhkNjBkMjI4ZDcyZDIzNGQ4MGQyMzZkOTdkMjY0ZDExNGQyOTJkMTQzZDM0N2QxNzJkNDAyZDE5NGQ0NDdkMjE2ZDQ5MmQyMzBkNTE3ZDI0NGQ1NDJkMjY0ZDU3NGQzMDZkNDg0ZDM0NmQ0MDdkMzg2ZDMzMGQ0MDZkMjkwZDQyNmQyNTBkNDMyZDIzOGQ0NDRkMjI4ZDQ2MGQyMzJkNDc2ZDIzNmQ0ODBkMjUyZDQ4MmQyNjJkNDgwZDI2OGQ0NzhkMjc4ZDQ1NWQzMjhkNDMyZDM3OGQzOTZkNDQ3ZDM2MGQ1MTZkMjk2ZDYzNmQzNjRkNjMyZDQ0MGQ2MjRkNDU2ZDYyOGQ0NjBkNjQ0ZDQ2MmQ2NTRkNDYwZDY2MmQ0NTRkNjc4ZDQ0MGQ2ODJkMjkwZDY5OGQyOTBkNzc4ZDMzNGQ3NzRkMzY4ZDc3MWQ0MDJkNzY4ZDQ0MGQ3NjhkNDU0ZDc3MGQ0NjBkNzg2ZDQ2MmQ3OTZkNDYwZDgwNGQ0NTZkODIwZDQ0MGQ4MjRkMjg4ZDgzNmQyODhkODk2ZDI4NGQxMDEyZDI4MmQxMDI4ZDI4MWQxMDM2ZDI4MGQxMDQ0ZDI3MmQxMDUwZDI2MGQxMDU4ZDI0NmQxMDU2aFIyZDUxMlIzZDQ4MFI0ZDM0UjVkNzkyUjZkLTMyUjdkNzU4UjhkMFI5ZDE0NFIxMGk5MlIxMWQzNFIxMmQ1MTJSMTNhaTFpM2kyaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTJpM2kzaTNpM2hnOjIwNG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIwNFIxMWQwUjEyZDUxMlIxM2FoZzo5MW9SMGQ4ODBSMWFkMjMyZDExMTJkMjEwZDExMTFkMTk2ZDExMDdkMTg2ZDEwOTlkMTc2ZDEwODdkMTc0ZDEwNjguNWQxNzJkMTA1MGQxNzRkOTU2ZDE3NmQ4NjJkMTc5ZDcxOGQxODJkNTc0ZDE4NWQ0MzhkMTg4ZDMwMmQxODhkMjc5ZDE5MGQyNDhkMTk2ZDIxOGQyMDJkMjAzZDIyMGQyMDRkNDMyZDIwOGQ0NTBkMjEyZDQ1MmQyMjhkNDU0ZDIzNmQ0NTJkMjQ0ZDQ0OGQyNjBkNDMyZDI2OGQzMDRkMjYyZDI1MmQyNjRkMjQwZDU4NGQyMzZkNzM1ZDIzMmQ4ODZkMjMyZDEwNDhkMjQ2ZDEwNTBkMzYwZDEwNDlkMzkxZDEwNTAuNWQ0MjJkMTA1MmQ0MzZkMTA2MWQ0NDdkMTA3M2Q0NDZkMTA4NmQ0NDNkMTEwNmQ0MjZkMTExM2QzNTJkMTExMmQyMzJkMTExMmhSMmQ1MTJSM2Q0NTJSNGQxNzRSNWQ4MjBSNmQtODlSN2Q2NDZSOGQwUjlkMTQ0UjEwaTkxUjExZDE3NFIxMmQ1MTJSMTNhaTFpMmkzaTNpM2kzaTNpM2kyaTJpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaGc6MjAzb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjAzUjExZDBSMTJkNTEyUjEzYWhnOjkwb1IwZDg4MFIxYWQ5OGQxMDI4ZDc2ZDEwMTZkNzBkMTAwOGQ2OWQ5OTlkNjhkOTkwZDY4ZDk4MGQxMDJkODk0ZDE0MGQ4MTRkMTc4ZDczNGQyMTZkNjQ2ZDE5NGQ2MzBkMTc2ZDYxN2QxNThkNjA0ZDE0MGQ1ODZkMTM2ZDU4MGQxMzNkNTcyZDEzMGQ1NjRkMTMyZDU1N2QxMzRkNTUwZDE0MGQ1NDRkMTQ2ZDUzOGQxNzBkNTM2ZDE5MGQ1NTBkMjA2ZDU2NWQyMjJkNTgwZDI0NGQ1OTJkMjc2ZDUyMGQzMDhkNDUyZDM0MGQzODRkMzc0ZDMxNGQyMzBkMzE4ZDE5MWQzMjFkMTUyZDMyNGQxMDhkMzI4ZDg2ZDMyNGQ4MWQzMTRkNzZkMzA0ZDc4ZDI5M2Q4MGQyODJkODZkMjc2ZDkyZDI3MGQ5OGQyNjhkMTQ2ZDI2NmQxODdkMjYyZDIyOGQyNThkNDIwZDI1NmQ0NDZkMjYwZDQ1NGQyNjdkNDYyZDI3NGQ0NThkMjk0ZDQ0NGQzMTZkNDM2ZDMzMGQ0MjhkMzQ0ZDQwOGQzODVkMzg4ZDQyNmQzNTVkNDk0ZDMyMmQ1NjJkMjkyZDYzMmQzMTZkNjU0ZDM0M2Q2NzNkMzcwZDY5MmQzODhkNzE2ZDM5MGQ3MzhkMzgyZDc0NGQzNzRkNzUwZDM2MGQ3NTJkMzM4ZDc0NGQzMjJkNzMyZDMwM2Q3MTdkMjg0ZDcwMmQyNjRkNjg4ZDIyOGQ3NjJkMTk4ZDgyOWQxNjhkODk2ZDEzNGQ5NzBkMTUwZDk3MGQyMjRkOTY2ZDI5M2Q5NjFkMzYyZDk1NmQ0MzBkOTU2ZDQzNmQ5NThkNDQ0ZDk2NmQ0NTJkOTc0ZDQ1MmQ5ODZkNDUyZDk5OGQ0NDZkMTAwNGQ0NDBkMTAxMGQ0MzBkMTAxMmQzNDhkMTAxNmQyNjdkMTAyMGQxODZkMTAyNGQ5OGQxMDI4aFIyZDUxMlIzZDQ1OFI0ZDY4UjVkNzY4UjZkLTRSN2Q3MDBSOGQwUjlkMTQ0UjEwaTkwUjExZDY4UjEyZDUxMlIxM2FpMWkyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNoZzoyMDJvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDJSMTFkMFIxMmQ1MTJSMTNhaGc6ODlvUjBkODgwUjFhZDIyMmQxMDI2ZDE5OGQxMDIyZDIwMGQ5OTZkMjA4ZDkxOGQyMTVkODQwZDIyMmQ3NjJkMjE2ZDY5MmQxODZkNjU0ZDEzNGQ1NjZkOTZkNDY5ZDU4ZDM3MmQzMGQyODZkMjhkMjYwZDM2ZDI1NmQ0NGQyNTJkNTZkMjUzZDY4ZDI1NGQ3NmQyNjRkODRkMjc0ZDg4ZDI4MmQxMThkMzY4ZDE1M2Q0NTRkMTg4ZDU0MGQyMzJkNjE4ZDIzNmQ2MjJkMjQxZDYyNWQyNDZkNjI4ZDI1NGQ2MjZkMjk4ZDUzNmQzMzRkNDQ0ZDM3MGQzNTJkMzg4ZDI3NGQzOTRkMjU4ZDQwMmQyNTVkNDEwZDI1MmQ0MTdkMjU0ZDQyNGQyNTZkNDMwZDI2MmQ0MzZkMjY4ZDQzOGQyOTBkMzkwZDQ3MGQyODBkNjkyZDI3NGQ3NThkMjczZDc5MGQyNzJkODIyZDI2NmQ4NzNkMjYwZDkyNGQyNTdkOTY4ZDI1NGQxMDEyZDI0MGQxMDIwZDIzMmQxMDI4ZDIyMmQxMDI2aFIyZDUxMlIzZDQzOFI0ZDMwUjVkNzcxUjZkLTJSN2Q3NDFSOGQwUjlkMTQ0UjEwaTg5UjExZDMwUjEyZDUxMlIxM2FpMWkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMDFvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDFSMTFkMFIxMmQ1MTJSMTNhaGc6ODhvUjBkODgwUjFhZDgwZDEwMjRkNjhkMTAxNGQ2NmQ5OTJkMTA0ZDkxMmQxNDRkODE5ZDE4NGQ3MjZkMjIyZDYzMmQxNzZkNTQ0ZDEzMmQ0NTVkODhkMzY2ZDUwZDI3NmQ1MmQyNzBkNThkMjY0ZDY0ZDI1OGQ4MGQyNTdkOTZkMjU2ZDEwNWQyNjdkMTE0ZDI3OGQxMjJkMjk0ZDE2MGQzNzJkMTg5ZDQzNGQyMThkNDk2ZDI1NGQ1NjJkMjg4ZDQ4NmQzMjBkNDE0ZDM1MmQzNDJkMzk0ZDI1OGQ0MTJkMjQ4ZDQxOWQyNTFkNDI2ZDI1NGQ0MzRkMjYwZDQ0MmQyNjZkNDQwZDI5MGQzOThkMzg0ZDM1OGQ0NjhkMzE4ZDU1MmQyODhkNjM2ZDMzMmQ3MjhkMzc5ZDgyMmQ0MjZkOTE2ZDQ3MmQxMDA0ZDQ3MGQxMDE4ZDQ2NmQxMDIxZDQ2MmQxMDI0ZDQ0NGQxMDI2ZDQyNmQxMDIwZDQwNmQ5OThkMzkwZDk2OGQzNzRkOTM4ZDM1M2Q4OTZkMzMyZDg1NGQzMDhkODA3ZDI4NGQ3NjBkMjU0ZDcxMGQyMThkNzkyZDE4NGQ4NzNkMTUwZDk1NGQxMTZkMTAyMmQxMDZkMTAyNGQxMDBkMTAyNWQ5NGQxMDI2ZDgwZDEwMjRoUjJkNTEyUjNkNDcyUjRkNTBSNWQ3NzNSNmQtMlI3ZDcyM1I4ZDBSOWQxNDRSMTBpODhSMTFkNTBSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNoZzoyMDBvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMDBSMTFkMFIxMmQ1MTJSMTNhaGc6ODdvUjBkODgwUjFhZDM5NmQxMDE4ZDM3MWQ5ODlkMzYwZDk2MGQzMzRkOTAyZDMxOWQ4NjJkMjkzZDc5NmQyNjhkNzQwZDI0MGQ2NzhkMjIxZDczOGQxOTdkODE2ZDE3N2Q4NzRkMTYyZDkyMGQxNDdkOTY0ZDEzMWQxMDAyZDExMGQxMDIzZDk2ZDEwMjdkNzlkMTAyM2Q3M2QxMDE3ZDcwZDEwMDRkNjJkOTMwZDUwZDc1OGQ0OS41ZDYwOGQ0OWQ0NThkNDlkMzI4ZDUxZDI2M2Q1M2QyNTdkNTlkMjUxZDY1ZDI0NWQ3OGQyNDVkOTNkMjQ1ZDk5ZDI1MWQxMDVkMjU3ZDEwN2QyNjNkMTA1ZDM1NmQxMDVkNDUyZDEwNmQ1NjJkMTA4ZDY3OGQxMThkODYwZDE1OGQ3NjRkMTczZDcyNGQxOTZkNjcwZDIxMmQ2MzhkMjE5ZDYyN2QyMzJkNjIzZDI0MGQ2MjNkMjU0ZDYyM2QyNjZkNjM2ZDI4MGQ2NTZkMzEzZDcyMWQzNzNkODMyZDM5NGQ4NTVkNDAwZDczMmQzOTkuNWQ2MjlkMzk5ZDUyNmQ0MDBkNDA2ZDQwMmQyNTRkNDA4ZDI0NmQ0MTZkMjQyZDQzNGQyMzhkNDUxZDI0M2Q0NThkMjU0ZDQ1NmQyNzRkNDU0ZDI5NGQ0NTRkNDEyZDQ1NGQ1MTJkNDU0ZDgxNmQ0NTJkODc4ZDQ1NGQ5NjBkNDQ4ZDEwMThkNDM2ZDEwMjZkNDIxZDEwMzNkMzk2ZDEwMThoUjJkNTEyUjNkNDU2UjRkNDlSNWQ3ODJSNmQtMlI3ZDczM1I4ZDBSOWQxNDRSMTBpODdSMTFkNDlSMTJkNTEyUjEzYWkxaTNpM2kyaTNpM2kyaTJpMmkzaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTJpM2hnOjE5OW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE5OVIxMWQwUjEyZDUxMlIxM2FoZzo4Nm9SMGQ4ODBSMWFkMjI4ZDEwMjJkMjE4ZDEwMDhkMjE0ZDEwMDJkMTY4ZDgyMmQxMjVkNjM0ZDgyZDQ0NmQ1NmQzMzhkNDZkMzAxZDM4ZDI3NGQ0MGQyNjhkNDZkMjYyZDUyZDI1NmQ1OGQyNTRkNzZkMjU0ZDgyZDI1NmQ4OGQyNjJkOTRkMjY4ZDk2ZDI3NGQxMjhkNDA4ZDE2OGQ1NTdkMjA4ZDcwNmQyMzJkODYyZDI3MGQ3MDJkMzE1ZDU0OWQzNjBkMzk2ZDQxOGQyNjJkNDI1ZDI1NmQ0MzBkMjU0LjVkNDM1ZDI1M2Q0NDVkMjU0ZDQ1NWQyNTZkNDU5ZDI2MGQ0NjNkMjY0ZDQ2NWQyNzRkNDY0ZDI5NGQ0MDRkNDQ4ZDM1NGQ2MjJkMzA0ZDc5NmQyNjRkOTY0ZDI2OGQ5NzRkMjcxZDk4M2QyNzRkOTkyZDI3MmQxMDA0ZDI3MGQxMDEwZDI2NGQxMDE2ZDI1OGQxMDIyZDI1MmQxMDI0ZDIyOGQxMDIyaFIyZDUxMlIzZDQ2NVI0ZDM4UjVkNzcwUjZkMFI3ZDczMlI4ZDBSOWQxNDRSMTBpODZSMTFkMzhSMTJkNTEyUjEzYWkxaTNpM2kzaTJpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmhnOjE5OG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE5OFIxMWQwUjEyZDUxMlIxM2FoZzo4NW9SMGQ4ODBSMWFkMzkwZDEwMzRkMzc4ZDEwMjBkMzc0ZDEwMTJkMzcwZDk4MmQzMzZkMTAwMmQzMDlkMTAxMmQyODJkMTAyMmQyNDZkMTAyMWQyMTBkMTAyMGQxNzZkMTAwOGQxNDJkOTk2ZDExNGQ5NTdkODZkOTE4ZDc0ZDg2MGQ2MmQ4MDJkNjFkNzM0ZDYwZDY2NmQ2NGQ1MDZkNjhkMzQ2ZDcwZDMzMGQ3MmQzMTRkNzVkMjk3ZDc4ZDI4MGQ5MGQyNjZkOTZkMjYyZDEwMmQyNjFkMTA4ZDI2MGQxMTZkMjYyZDEyNGQyNjRkMTI5ZDI2OWQxMzRkMjc0ZDEzOGQyOThkMTM0ZDMwNGQxMzNkMzEzZDEzMmQzMjJkMTMxZDMzNWQxMzBkMzQ4ZDEyNGQ1MDdkMTE4ZDY2NmQxMTlkNzMxZDEyMGQ3OTZkMTMxZDg0NmQxNDJkODk2ZDE2NWQ5MjVkMTg4ZDk1NGQyMTNkOTU5ZDIzOGQ5NjRkMjYzZDk2MmQyODhkOTYwZDMwNGQ5NTFkMzIwZDk0MmQzMzhkOTMwZDM2NmQ4OTBkMzczZDg0MmQzODBkNzk0ZDM3OWQ3MjlkMzc4ZDY2NGQzODFkNDgwZDM4NGQyOTZkMzkwZDI2NmQ0MDBkMjU0ZDQwNmQyNTNkNDEyZDI1MmQ0MjRkMjUyZDQzMmQyNTZkNDM3ZDI2MWQ0NDJkMjY2ZDQ0NmQyNzRkNDQ0ZDMwMGQ0NDFkNDg0ZDQzOGQ2NjhkNDM3ZDc0MWQ0MzZkODE0ZDQzMmQ4NjJkNDI4ZDkxMGQ0MjZkOTYwZDQyNmQ5NzZkNDMwZDk4OWQ0MzRkMTAwMmQ0MzNkMTAxM2Q0MzJkMTAyNGQ0MjZkMTAzMGQ0MjBkMTAzNmQzOTBkMTAzNGhSMmQ1MTJSM2Q0NDZSNGQ2MVI1ZDc3MlI2ZC0xMFI3ZDcxMVI4ZDBSOWQxNDRSMTBpODVSMTFkNjFSMTJkNTEyUjEzYWkxaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTk3b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTk3UjExZDBSMTJkNTEyUjEzYWhnOjg0b1IwZDg4MFIxYWQyNTBkMTAyMmQyMzBkMTAyMmQyMjhkMTAwNGQyMjBkOTYzZDIyMGQ5MzNkMjE5ZDkxN2QyMTYuNWQ3ODEuNWQyMTRkNjQ2ZDIxOWQ1MDFkMjI0ZDM1NmQyMjZkMzEzZDE3MmQzMTJkMTQyZDMxN2QxMTJkMzIyZDY0ZDMzNmQ0NmQzMzVkNDFkMzE1LjVkMzZkMjk2ZDUxZDI4MmQ2MmQyNzRkMTIwZDI1OGQxNzdkMjU1ZDIzNGQyNTJkMjk0ZDI1NWQzNTRkMjU4ZDM5MC41ZDI2MmQ0MjdkMjY2ZDQ1NGQyNzVkNDU5ZDI3OWQ0NjdkMjk3ZDQ2MWQzMTNkNDU1ZDMyOWQ0MzRkMzMwZDQwOGQzMjRkMzcxZDMxOGQzMzRkMzEyZDI4MGQzMTNkMjc2ZDM1OGQyNzNkNTAzZDI3MGQ2NDhkMjcwLjVkNzgyLjVkMjcxZDkxN2QyNzNkOTMzZDI3M2Q5NjNkMjgwZDEwMDRkMjc4ZDEwMTBkMjc0ZDEwMTZkMjcwZDEwMjJkMjUwZDEwMjJoUjJkNTEyUjNkNDYxUjRkNDFSNWQ3NjlSNmQyUjdkNzI4UjhkMFI5ZDE0NFIxMGk4NFIxMWQ0MVIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE5Nm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE5NlIxMWQwUjEyZDUxMlIxM2FoZzo4M29SMGQ4ODBSMWFkMjM0ZDEwMjRkMTk0ZDEwMjRkMTY1ZDEwMDlkMTM2ZDk5NGQxMDZkOTYzZDc2ZDkzMmQ2M2Q4ODdkNTBkODQyZDQ0ZDc5NmQ0NmQ3NzRkNjBkNzY5ZDc0ZDc2NGQ4M2Q3NjdkOTJkNzcwZDEwMmQ3ODhkMTA4ZDgyOGQxMThkODY1ZDEyOGQ5MDJkMTUxZDkyNWQxNzRkOTQ4ZDE5N2Q5NTlkMjIwZDk3MGQyNDdkOTY4ZDI3NGQ5NjZkMzAxZDk1OWQzMjhkOTUyZDM0NmQ5MjlkMzY0ZDkwNmQzNzBkODgyZDM3NmQ4NThkMzcxZDgyNmQzNjZkNzk0ZDM0OWQ3NjZkMzMyZDczOGQyOTJkNjk4ZDI1MmQ2NThkMTkyZDYxNmQxMzJkNTc0ZDEwOGQ1MzVkODRkNDk2ZDgxZDQ3NmQ3OGQ0NTZkODJkNDI0ZDg2ZDM5MmQxMDdkMzU2ZDEyOGQzMjBkMTU2ZDI5NmQxODRkMjcyZDIxM2QyNjRkMjQyZDI1NmQyNzJkMjU2ZDMwMmQyNTZkMzI5ZDI2N2QzNTZkMjc4ZDM4M2QzMDhkNDEwZDMzOGQ0MzFkMzc5ZDQ1MmQ0MjBkNDUyZDQ3MGQ0NTBkNDc2ZDQ0NGQ0ODJkNDM4ZDQ4OGQ0MjRkNDg4ZDQxMGQ0ODhkNDA0ZDQ4MmQzOThkNDc2ZDM5NmQ0NzBkMzkyZDQzMmQzNzVkMzk5ZDM1OGQzNjZkMzM1ZDM0NWQzMTJkMzI0ZDI4OGQzMThkMjY0ZDMxMmQyNDNkMzE2ZDIyMmQzMjBkMjA4ZDMyN2QxOTRkMzM0ZDE3NmQzNTRkMTU4ZDM3NGQxNDhkNDAxZDEzOGQ0MjhkMTQxZDQ1NWQxNDRkNDgyZDE1OGQ1MDRkMTcyZDUyNmQyMDZkNTUyZDI0MGQ1NzhkMzA1ZDYzNGQzNzBkNjkwZDM5N2Q3NDBkNDI0ZDc5MGQ0MjhkODE5ZDQzMmQ4NDhkNDI4ZDg4MGQ0MjRkOTEyZDQwOWQ5NDBkMzk0ZDk2OGQzNjVkOTkwZDMzNmQxMDEyZDMwOWQxMDE4ZDI4MmQxMDI0ZDIzNGQxMDI0aFIyZDUxMlIzZDQ1MlI0ZDQ0UjVkNzY4UjZkMFI3ZDcyNFI4ZDBSOWQxNDRSMTBpODNSMTFkNDRSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTk1b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTk1UjExZDBSMTJkNTEyUjEzYWhnOjgyb1IwZDg4MFIxYWQ0MzhkMTAyMmQzNzZkOTU4ZDMyNWQ4ODlkMjc0ZDgyMGQyMzZkNzQ0ZDE5OGQ3NTBkMTg2ZDc1M2QxNzRkNzU2ZDExNmQ3NTBkMTEyZDk0OGQxMTJkOTgyZDExMmQxMDEwZDEwNGQxMDE3ZDk2ZDEwMjRkODNkMTAyNGQ3MGQxMDI0ZDYxZDEwMTZkNTJkMTAwOGQ1MmQ5ODRkNTRkOTQ4ZDU5ZDc4M2Q2NGQ2MThkNjlkNDk3ZDc0ZDM3NmQ5MGQyNjJkOTZkMjU4ZDEwMmQyNTZkMTA4ZDI1NGQxMTZkMjU0ZDEzMGQyNjJkMTg2ZDI2MmQyMjRkMjY1ZDI2MmQyNjhkMzA3ZDI4NmQzNTJkMzA0ZDM4NmQzNDNkNDIwZDM4MmQ0MzRkNDMwZDQ0OGQ0NzhkNDQ1ZDUyN2Q0NDJkNTc2ZDQyOGQ2MTJkNDE0ZDY0OGQzODhkNjcwZDM2MmQ2OTJkMzQxZDcwNWQzMjBkNzE4ZDI5NGQ3MjRkMzMwZDgwNmQzODdkODc1ZDQ0NGQ5NDRkNDg0ZDk4OGQ0OTRkMTAxNGQ0ODZkMTAxOWQ0NzhkMTAyNGQ0NjdkMTAyNmQ0NTZkMTAyOGQ0MzhkMTAyMmQzMjJkNjQ2ZDM2MGQ2MTBkMzcwZDU4NmQzODBkNTYyZDM4NGQ1MzFkMzg4ZDUwMGQzODNkNDY4ZDM3OGQ0MzZkMzY2ZDQwOGQzNTRkMzgwZDMyOWQzNThkMzA0ZDMzNmQyNzRkMzI0ZDI0NGQzMTJkMjEzZDMxMGQxODJkMzA4ZDE0NGQzMDhkMTI4ZDQwOGQxMjVkNDk4ZDEyMmQ1ODhkMTIwZDY4NGQxMzZkNjg4ZDE1NGQ2ODlkMTcyZDY5MGQxODlkNjg4ZDIwNmQ2ODZkMjQxZDY3OWQyNzZkNjcyZDMyMmQ2NDZoUjJkNTEyUjNkNDg2UjRkNTJSNWQ3NzBSNmQtMlI3ZDcxOFI4ZDBSOWQxNDRSMTBpODJSMTFkNTJSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE5NG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE5NFIxMWQwUjEyZDUxMlIxM2FoZzo4MW9SMGQ4ODBSMWFkNDY2ZDEwMzZkNDQ0ZDEwMjJkNDI3ZDEwMDVkNDEwZDk4OGQzOTJkOTcwZDM2NmQxMDAyZDM0N2QxMDA3ZDMyOGQxMDEyZDMxMGQxMDE1ZDI5MmQxMDE4ZDI3NGQxMDE4ZDI1NmQxMDE4ZDIzOWQxMDE2ZDIyMmQxMDE0ZDE5N2QxMDAyZDE3MmQ5OTBkMTI0ZDkzN2Q3NmQ4ODRkNTZkNzgyZDM2ZDY4MGQ0Mi41ZDU5MWQ0OWQ1MDJkNjYuNWQ0MzdkODRkMzcyZDEyM2QzMjlkMTYyZDI4NmQyMDFkMjcxZDI0MGQyNTZkMjc3ZDI1OGQzMTRkMjYwZDM0MWQyNzhkMzY4ZDI5NmQzOTVkMzM3ZDQyMmQzNzhkNDMzZDQ1MGQ0NDRkNTIyZDQ0N2Q1OTBkNDUwZDY1OGQ0NDlkNzExZDQ0OGQ3NjRkNDQzZDgxNWQ0MzhkODY2ZDQyMmQ5MTJkNDQyZDkzOGQ0NjFkOTU3ZDQ4MGQ5NzZkNTAyZDEwMDBkNTAwZDEwMjRkNDk0ZDEwMjlkNDg4ZDEwMzRkNDY2ZDEwMzZkMzMyZDk0MGQzMzhkOTM0ZDM0NGQ5MjhkMzUwZDkyMmQzNTBkOTE0ZDMxNGQ4NzJkMjg2ZDgyN2QyNThkNzgyZDIzNmQ3NTBkMjM0ZDcyOGQyNTBkNzE4ZDI2NmQ3MDhkMjg2ZDcxOGQzMDhkNzQ4ZDMyOWQ3ODVkMzUwZDgyMmQzNzhkODU0ZDM4NGQ4MjBkMzg4ZDc4NGQzOTJkNzQ4ZDM5MmQ3MDJkMzkyZDY1NmQzODlkNTkwZDM4NmQ1MjRkMzc2ZDQ1NWQzNjZkMzg2ZDM0NGQzNTdkMzIyZDMyOGQyOTlkMzE5ZDI3NmQzMTBkMjUyZDMxM2QyMjhkMzE2ZDIwM2QzMzBkMTc4ZDM0NGQxNTFkMzgzZDEyNGQ0MjJkMTEyLjVkNDg4ZDEwMWQ1NTRkOTguNWQ2MzZkOTZkNzE4ZDEyM2Q4MDBkMTUwZDg4MmQxOTBkOTE4ZDIzMGQ5NTRkMjYzZDk1OGQyOTZkOTYyZDMzMmQ5NDBoUjJkNTEyUjNkNTAyUjRkNDJSNWQ3NjZSNmQtMTJSN2Q3MjRSOGQwUjlkMTQ0UjEwaTgxUjExZDQyUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTkzb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTkzUjExZDBSMTJkNTEyUjEzYWhnOjgwb1IwZDg4MFIxYWQ4NmQxMDIyZDcyZDEwMTZkNjZkMTAwNWQ2MGQ5OTRkNjBkOTc2ZDYyZDg5OGQ2NmQ4MjVkNzBkNzUyZDczZDY3M2Q3NmQ1OTRkNzhkNTE2ZDgwZDQzOGQ3OWQzNjVkNzhkMjkyZDkyZDI2NGQ5OGQyNjBkMTA2ZDI1OGQxMTRkMjU2ZDE1NmQyNTZkMTk4ZDI1NmQyNzBkMjczZDM0MmQyOTBkMzkwZDMzNmQ0MzhkMzgyZDQ1NGQ0MjZkNDcwZDQ3MGQ0NjZkNTIwZDQ2MmQ1NzBkNDQzZDYwOGQ0MjRkNjQ2ZDM3MmQ2ODZkMzIwZDcyNmQyNTdkNzQzZDE5NGQ3NjBkMTI2ZDc2MGQxMjBkODk4ZDExOGQ5NzZkMTE4ZDk5MmQxMTlkMTAwMWQxMjBkMTAxMGQxMTRkMTAxNmQxMDhkMTAyMmQ4NmQxMDIyZDM0MGQ2MzRkMzc4ZDYwNmQzODlkNTgyZDQwMGQ1NThkNDA2ZDUzM2Q0MTJkNTA4ZDQwOWQ0NzVkNDA2ZDQ0MmQzODRkNDA4ZDM2MmQzNzRkMzIwZDM0OWQyNzhkMzI0ZDIzNWQzMTJkMTkyZDMwMGQxNDJkMzA0ZDEzOGQ0MzRkMTM2ZDUxMGQxMzRkNTg2ZDEzMGQ2OTZkMTk2ZDY5NmQyNDFkNjgxZDI4NmQ2NjZkMzQwZDYzNGhSMmQ1MTJSM2Q0NjZSNGQ2MFI1ZDc2OFI2ZDJSN2Q3MDhSOGQwUjlkMTQ0UjEwaTgwUjExZDYwUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE5Mm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE5MlIxMWQwUjEyZDUxMlIxM2FoZzo3OW9SMGQ4ODBSMWFkMjM0ZDEwMjJkMjA0ZDEwMjJkMTY2ZDEwMDhkMTI4ZDk5NGQ5NmQ5NTRkNjRkOTE0ZDQ5ZDg0MmQzNGQ3NzBkMzZkNjc1ZDM4ZDU4MGQ2MmQ0ODFkODZkMzgyZDEyNWQzMzBkMTY0ZDI3OGQyMDVkMjY0ZDI0NmQyNTBkMjgzZDI1NmQzMjBkMjYyZDM1MWQyODVkMzgyZDMwOGQ0MDJkMzUyZDQzMmQzNDBkNDQwZDMzNWQ0NDhkMzMwZDQ2NGQzMjhkNDg0ZDMzNmQ0ODZkMzU1ZDQ4OGQzNzRkNDc0ZDM4OGQ0MjZkNDA2ZDQ0NGQ0ODJkNDUwZDUyOWQ0NTZkNTc2ZDQ1NmQ2OTVkNDU2ZDgxNGQ0MzVkODczZDQxNGQ5MzJkMzczZDk2NmQzMzJkMTAwMGQzMDFkMTAxMWQyNzBkMTAyMmQyMzRkMTAyMmQzMTBkOTQyZDMzMmQ5MjZkMzUxZDkwNWQzNzBkODg0ZDM3OWQ4NTlkMzg4ZDgzNGQzOTNkODEyZDM5OGQ3OTBkMzk5ZDczMmQ0MDBkNjc0ZDM5OWQ2MjFkMzk4ZDU2OGQzOTJkNTIwZDM4NmQ0NzJkMzc0ZDQyNGQzMThkNDM0ZDI3NGQ0MjVkMjMwZDQxNmQyMDlkMzk2ZDE4OGQzNzZkMTg0ZDM2OGQxODBkMzYwZDE3NmQzNDZkMTMyZDQxNmQxMTNkNTA2ZDk0ZDU5NmQ5M2Q2ODlkOTJkNzgyZDEwOGQ4MzlkMTI0ZDg5NmQxNTFkOTIzZDE3OGQ5NTBkMjAyZDk1N2QyMjZkOTY0ZDI3MmQ5NjBkMzEwZDk0MmQzNDZkMzY2ZDMzNGQzMzZkMzE0ZDMyMmQyOTRkMzA4ZDI4M2QzMDRkMjcyZDMwMGQyNThkMzAwZDI0NGQzMDhkMjM0ZDMyMGQyMzRkMzMyZDI0NGQzNjBkMjc4ZDM2OWQzMTJkMzc4ZDM0NmQzNjZoUjJkNTEyUjNkNDg2UjRkMzZSNWQ3NjhSNmQyUjdkNzMyUjhkMFI5ZDE0NFIxMGk3OVIxMWQzNlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpMmkzaTNoZzoxOTFvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxOTFSMTFkMFIxMmQ1MTJSMTNhaGc6NzhvUjBkODgwUjFhZDc0ZDEwMjJkNThkMTAxMmQ1NGQ5OTRkNTJkOTU2ZDU4ZDgzMmQ2NGQ3MDhkNjdkNTY5ZDcwZDQzMGQ2NmQzODFkNjJkMzMyZDU4ZDI4NGQ2NGQyNThkODZkMjU0ZDEwOGQyNTBkMTIyZDI2OGQxNzhkNDE4ZDI0M2Q1NjdkMzA4ZDcxNmQzOTBkODYyZDM4NGQ1NjJkMzg4ZDQ0NWQzOTJkMzI4ZDM5NGQzMDRkMzkyZDI3MmQ0MDBkMjY0ZDQwOGQyNTZkNDE5ZDI1NmQ0MzBkMjU2ZDQ0MGQyNjJkNDUwZDI2OGQ0NTJkMzA0ZDQ1MmQzMzZkNDQ2ZDQ1NGQ0NDBkNTcyZDQ1NGQ5OTRkNDUyZDEwMDhkNDQwZDEwMTVkNDI4ZDEwMjJkNDA2ZDEwMTRkMzkyZDEwMDBkMzE2ZDg2NmQyNTNkNzIzZDE5MGQ1ODBkMTI4ZDQzOGQxMThkNzEyZDExNGQ4MzVkMTEwZDk1OGQxMTJkMTAwMmQxMTBkMTAxMmQxMDJkMTAxN2Q5NGQxMDIyZDc0ZDEwMjJoUjJkNTEyUjNkNDU0UjRkNTRSNWQ3NzBSNmQyUjdkNzE2UjhkMFI5ZDE0NFIxMGk3OFIxMWQ1NFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaGc6MTkwb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTkwUjExZDBSMTJkNTEyUjEzYWhnOjc3b1IwZDg4MFIxYWQ0MzBkMTAyMmQ0MTBkMTAxMGQ0MTJkOTgyZDQxNGQ5MTRkNDEyZDgwOWQ0MTBkNzA0ZDQwOGQ1NjBkNDA2ZDUyNGQ0MDZkMzc0ZDM4NWQ0MzZkMzc3LjVkNDUzZDM3MGQ0NzBkMzQ2ZDU0OGQzMTBkNjU0ZDI5NmQ2OTZkMjkwZDcxMGQyODJkNzI4ZDI3MmQ3NDhkMjYyZDc1NWQyNTJkNzYyZDI0NWQ3NTdkMjM4ZDc1MmQyMjZkNzM0ZDIyMGQ3MjBkMjA4ZDY4OGQxOTZkNjUyZDE2NmQ1NTJkMTQ4ZDQ5MmQxMzguNWQ0NjdkMTI5ZDQ0MmQxMDZkMzgwZDEwNGQ2MDBkMTA2ZDkxOGQxMDZkOTYwZDEwMmQxMDAwZDEwMmQxMDEwZDk2ZDEwMTZkOTBkMTAyMmQ3OGQxMDIyZDY2ZDEwMjJkNjBkMTAxNmQ1NGQxMDEwZDQ4ZDk5NmQ1MGQ5NThkNTJkOTA4ZDU2ZDU5NmQ1MmQ0MzRkNTBkMzMyZDUwZDMxNmQ1MmQyOTJkNjBkMjY2ZDc2ZDI2MmQ5MmQyNThkMTAxZDI2MWQxMTBkMjY0ZDExNWQyNjlkMTIwZDI3NGQxMjRkMjgyZDEzOGQzMDRkMTU0ZDM1MmQxNzJkNDA4ZDIwMmQ1MDBkMjI0ZDU4MGQyNTZkNjgwZDI4NmQ1NzZkMzA2ZDUxNmQzNTBkMzg4ZDM5NmQyNzZkNDA4ZDI1MGQ0MjFkMjUwZDQzNGQyNTBkNDQwZDI1MWQ0NDZkMjUyZDQ1MmQyNThkNDU4ZDI2NGQ0NjBkMjgyZDQ1OGQ1NThkNDYwZDU3NmQ0NjBkNjQ5ZDQ2MGQ3MjJkNDYyZDgxOGQ0NjRkOTE0ZDQ2NGQ5MzRkNDY0ZDk1NGQ0NjZkOTc2ZDQ2NmQxMDAwZDQ1N2QxMDExZDQ0OGQxMDIyZDQ0NGQxMDIzZDQ0MGQxMDI0ZDQzMGQxMDIyaFIyZDUxMlIzZDQ2NlI0ZDQ4UjVkNzc0UjZkMVI3ZDcyNlI4ZDBSOWQxNDRSMTBpNzdSMTFkNDhSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNoZzoxODlvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxODlSMTFkMFIxMmQ1MTJSMTNhaGc6NzZvUjBkODgwUjFhZDk2ZDEwMjhkOTBkMTAyNmQ4NGQxMDIwZDc4ZDEwMTRkNzZkMTAwOGQ4MGQ2NTJkNzlkNDk4ZDc4ZDM0NGQ3NmQyODhkODRkMjYyZDk4ZDI1OGQxMTJkMjU0ZDEyM2QyNjNkMTM0ZDI3MmQxMzZkMjk2ZDEzMGQzNDZkMTMxZDUwMWQxMzJkNjU2ZDEzMmQ5NjRkMjA4ZDk1NGQyODBkOTU0ZDM1MmQ5NTRkMzk2ZDk2MGQzOTRkOTEyZDQwNmQ4ODhkNDEyZDg4MmQ0MTlkODgyZDQyNmQ4ODJkNDMzZDg4M2Q0NDBkODg0ZDQ0NmQ4OTBkNDUyZDg5NmQ0NTRkOTIwZDQ1MGQ5NjBkNDU4ZDEwMDZkNDU2ZDEwMTJkNDQ2ZDEwMjBkNDM2ZDEwMjhkNDE1ZDEwMjRkMzk0ZDEwMjBkMzc0ZDEwMTVkMzU0ZDEwMTBkMjgyZDEwMTBkMjEwZDEwMTBkMTcyZDEwMTZkMTM0ZDEwMjJkOTZkMTAyOGhSMmQ1MTJSM2Q0NThSNGQ3NlI1ZDc2NlI2ZC00UjdkNjkwUjhkMFI5ZDE0NFIxMGk3NlIxMWQ3NlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxODhvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxODhSMTFkMFIxMmQ1MTJSMTNhaGc6NzVvUjBkODgwUjFhZDM5OGQxMDEwZDM2NmQ5NzhkMzQ0ZDk0OGQzMjJkOTE4ZDI1OGQ4MzZkMTk0ZDc1NGQxNThkNzAyZDEzNGQ3MTRkMTMwZDc5MGQxMjZkODY2ZDEyMmQ5NDJkMTE0ZDk5OGQxMDRkMTAyNGQ4MGQxMDI0ZDU4ZDEwMTRkNThkOTg2ZDYyZDkzNGQ2NmQ4ODNkNzBkODMyZDczZDc4MmQ3NmQ3MzJkNzZkNjE4ZDc2ZDUwNGQ3MmQ0MTRkNjhkMzI0ZDY4ZDI3NGQ3MGQyNjhkNzZkMjYyZDgyZDI1NmQ5N2QyNTZkMTEyZDI1NmQxMTdkMjYzZDEyMmQyNzBkMTI2ZDI3OGQxMjZkMzI4ZDEyOWQ0MTdkMTMyZDUwNmQxMzZkNjE0ZDE5OGQ1MjJkMjYyZDQzNGQzMjZkMzQ2ZDM1NGQzMTNkMzgyZDI4MGQzOTZkMjY0ZDQxNmQyNDhkNDMzZDI2NWQ0NTBkMjgyZDQzNGQzMDRkMzU2ZDQwMmQyOThkNDgyZDI0MGQ1NjJkMTkwZDY1MGQyNjBkNzQyZDMyNmQ4MjRkMzkyZDkwNmQ0NDhkOTgyZDQ1NGQxMDA4ZDQzNGQxMDE2ZDQxNGQxMDI0ZDM5OGQxMDEwaFIyZDUxMlIzZDQ0OFI0ZDU4UjVkNzY4UjZkMFI3ZDcxMFI4ZDBSOWQxNDRSMTBpNzVSMTFkNThSMTJkNTEyUjEzYWkxaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTg3b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTg3UjExZDBSMTJkNTEyUjEzYWhnOjc0b1IwZDg4MFIxYWQxODhkMTAyNGQxNjRkMTAyMGQxNDBkMTAwM2QxMTZkOTg2ZDkxZDk1OGQ2NmQ5MzBkNjBkODg4ZDU0ZDg0NmQ1NGQ4MTZkNTRkNzg2ZDU2ZDc2N2Q1OGQ3NDhkNjhkNzM0ZDc0ZDczMGQ4NGQ3MjdkOTRkNzI0ZDEwMWQ3MjZkMTA4ZDcyOGQxMTRkNzM0ZDEyMGQ3NDBkMTIyZDc2MmQxMTZkNzc0ZDExNmQ3OTBkMTE2ZDgwNmQxMTZkODI5ZDExNmQ4NTJkMTIyZDg4MWQxMjhkOTEwZDE0N2Q5MzNkMTY2ZDk1NmQxODlkOTY0ZDIxMmQ5NzJkMjMyZDk2OWQyNTJkOTY2ZDI3NGQ5NTJkMjk2ZDkzOGQzMThkOTAxZDM0MGQ4NjRkMzQxZDc5M2QzNDJkNzIyZDM0M2Q1ODFkMzQ0ZDQ0MGQzNDRkMzEyZDMwOGQzMTJkMjgyZDMwMmQyODNkMjgzZDI4NGQyNjRkMzEyZDI1NGQ0MjBkMjU0ZDQ0NmQyNTZkNDU0ZDI2N2Q0NjJkMjc4ZDQ2MWQyOTNkNDYwZDMwOGQ0MzhkMzE0ZDQwMmQzMTJkNDAyZDQ0MmQ0MDJkNTkyZDQwMmQ3NDJkMzkzZDg0NGQzNzhkOTIwZDM0NmQ5NjBkMzA0ZDEwMTJkMjY1ZDEwMjBkMjI2ZDEwMjhkMTg4ZDEwMjRoUjJkNTEyUjNkNDYxUjRkNTRSNWQ3NzBSNmQwUjdkNzE2UjhkMFI5ZDE0NFIxMGk3NFIxMWQ1NFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2hnOjE4Nm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE4NlIxMWQwUjEyZDUxMlIxM2FoZzo3M29SMGQ4ODBSMWFkMjMyZDkzMGQyMzJkMzQwZDIyMWQzNDBkMTc2ZDMzOGQxNjdkMzM1ZDE2MWQzMThkMTU4ZDMwN2QxNTdkMjkwLjVkMTU2ZDI3NGQxNThkMjY4ZDE2MmQyNThkMTc2ZDI1NGQxODBkMjU0ZDIzMmQyNTBkMjg4ZDI1MGQzNDBkMjUwZDM1NmQyNTBkMzY5ZDI1M2QzNzhkMjY2ZDM4NGQyNzVkMzg0ZDI5OC41ZDM4NGQzMjJkMzc2ZDMyNmQzNjhkMzMxZDM1NmQzMzNkMzM5ZDMzN2QyOThkMzQwZDI4OGQzNDBkMjg4ZDkzMGQyODhkOTM0ZDI5OWQ5MzRkMzYyZDkzNGQzNzJkOTM1ZDM3OGQ5NDRkMzgxZDk1N2QzODBkMTAwMGQzNzZkMTAxNWQzNTJkMTAxNmQxNjBkMTAxNmQxNDhkMTAxM2QxNDFkMTAwNGQxMzNkOTkzZDEzM2Q5NzFkMTMzZDk0OWQxNTVkOTQwZDIyNGQ5MzRkMjMyZDkzNGQyMzJkOTMwaFIyZDUxMlIzZDM4NFI0ZDEzM1I1ZDc3NFI2ZDhSN2Q2NDFSOGQwUjlkMTQ0UjEwaTczUjExZDEzM1IxMmQ1MTJSMTNhaTFpMmkyaTJpM2kzaTNpM2kyaTJpMmkyaTJpM2kzaTNpM2kzaTJpMmkyaTJpMmkzaTNpM2kyaTNpM2kzaTJpMmkyaGc6MTg1b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTg1UjExZDBSMTJkNTEyUjEzYWhnOjcyb1IwZDg4MFIxYWQ0MTZkMTAyNmQzOTRkMTAyMmQzODZkMTAwNGQzODRkOTkwZDM4NWQ4OTZkMzg2ZDgwMmQzOTBkNjUyZDMwNmQ2NTZkMjg3ZDY1N2QyNjhkNjU4ZDI0NWQ2NThkMjIyZDY1OGQxMzZkNjYyZDEzMmQ3NzZkMTI5ZDg2MGQxMjZkOTQ0ZDEyM2Q5NzNkMTIwZDEwMDJkMTExZDEwMTJkMTAyZDEwMjJkOTZkMTAyM2Q5MGQxMDI0ZDgzZDEwMjNkNzZkMTAyMmQ3MGQxMDE2ZDY0ZDEwMTBkNjBkOTkwZDYwZDk4MGQ2MWQ5NTdkNjJkOTM0ZDY3ZDg0MmQ3MmQ3NTBkNzdkNjIxZDgyZDQ5MmQ4MGQ0MzdkNzhkMzgyZDc1ZDMzOWQ3MmQyOTZkNzJkMjg0ZDgyZDI2NmQ5MGQyNjBkOThkMjU0ZDEwNmQyNTRkMTE0ZDI1NGQxMjFkMjYwZDEyOGQyNjZkMTMyZDI3OGQxMzJkMjkyZDEzNGQzMzRkMTM2ZDM3NmQxMzdkNDM1ZDEzOGQ0OTRkMTM4ZDYwMmQyMjBkNjAyZDI0MmQ2MDFkMjY0ZDYwMGQyODVkNjAwZDMwNmQ2MDBkMzg4ZDU5NGQzODRkNDg4ZDM4MmQ0MjJkMzgwZDM1NmQzNzhkMzI2ZDM3NmQyOTZkMzc2ZDI4MGQzOTBkMjU4ZDQwM2QyNThkNDE2ZDI1OGQ0MjRkMjY0ZDQzMmQyNzBkNDM0ZDI4MGQ0MzZkMjk2ZDQzN2QzMjZkNDM4ZDM1NmQ0NDBkNDIyZDQ0MmQ0ODhkNDQyZDY0OGQ0NDJkODA4ZDQ0M2Q5MDNkNDQ0ZDk5OGQ0NDRkMTAxMmQ0MzRkMTAyNGQ0MTZkMTAyNmhSMmQ1MTJSM2Q0NDRSNGQ2MFI1ZDc3MFI2ZC0yUjdkNzEwUjhkMFI5ZDE0NFIxMGk3MlIxMWQ2MFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTg0b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTg0UjExZDBSMTJkNTEyUjEzYWhnOjcxb1IwZDg4MFIxYWQzODhkMTAxMmQzODZkOTM0ZDM3MmQ5NThkMzU0ZDk3OWQzMzZkMTAwMGQzMTdkMTAwOGQyOThkMTAxNmQyODJkMTAxN2QyNjZkMTAxOGQyNDFkMTAxNWQyMTZkMTAxMmQxODVkOTkxZDE1NGQ5NzBkMTIxZDkzMGQ4OGQ4OTBkNzFkODI4ZDU0ZDc2NmQ1MGQ2NzhkNDZkNTkwZDY2ZDQ4NGQ4NmQzNzhkMTMxZDMzMGQxNzZkMjgyZDIyNGQyNjdkMjcyZDI1MmQzMDNkMjU5ZDMzNGQyNjZkMzUyZDI3M2QzNzBkMjgwZDM5NmQzMDlkNDIyZDMzOGQ0MzVkMzg3ZDQ0OGQ0MzZkNDUwZDQ5MmQ0NDhkNDk4ZDQ0MmQ1MDRkNDM2ZDUxMGQ0MjJkNTEwZDQwOGQ1MTBkNDAyZDUwNGQzOTZkNDk4ZDM5NGQ0OTJkMzkyZDQ0OGQzODBkNDA4ZDM2OGQzNjhkMzQ4ZDM0NWQzMjhkMzIyZDMwNWQzMTdkMjgyZDMxMmQyNTdkMzE3ZDIzMmQzMjJkMjA2ZDMzOWQxODBkMzU2ZDE1M2Q0MDJkMTI2ZDQ0OGQxMTZkNTM1ZDEwNmQ2MjJkMTEyZDcwM2QxMThkNzg0ZDEzN2Q4MzZkMTU2ZDg4OGQxODZkOTE1ZDIxNmQ5NDJkMjM3ZDk0OGQyNThkOTU0ZDI4MWQ5NTJkMzA0ZDk1MGQzMjZkOTIyZDM0OGQ4OTRkMzcxZDgyOWQzOTRkNzY0ZDM5MmQ2OTRkMjcwZDY5NmQyNjRkNjk0ZDI1N2Q2ODZkMjUwZDY3OGQyNTBkNjY2ZDI1MGQ2NTRkMjUzZDY0OWQyNTZkNjQ0ZDI3MGQ2MzZkNDI0ZDYzNGQ0NDRkNjQ2ZDQ1MmQ2NThkNDUxZDY3NWQ0NTBkNjkyZDQ0OGQ3MTBkNDQ2ZDcyOGQ0NDVkNzUxZDQ0NGQ3NzRkNDQ0ZDEwMTJkNDM0ZDEwMjZkNDE2ZDEwMzBkMzk4ZDEwMzRkMzg4ZDEwMTJoUjJkNTEyUjNkNDUxUjRkNTBSNWQ3NjVSNmQtNlI3ZDcxNVI4ZDBSOWQxNDRSMTBpNzFSMTFkNTBSMTJkNTEyUjEzYWkxaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNoZzoxODNvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxODNSMTFkMFIxMmQ1MTJSMTNhaGc6NzBvUjBkODgwUjFhZDY0ZDEwMDJkNjJkOTQyZDY0ZDg3N2Q2NmQ4MTJkNjdkNjYxZDY4ZDUxMGQ3MWQ0NTFkNzRkMzkyZDc4ZDMwNGQ3NGQyOThkNzNkMjkyZDcyZDI4NmQ3M2QyNzlkNzRkMjcyZDgwZDI2NmQ4NmQyNjBkOTJkMjU4ZDExMGQyNTRkMTYwZDI2MGQyMTBkMjY2ZDI2NWQyNjRkMzIwZDI2MmQzNjhkMjYyZDQxNmQyNjJkNDQ4ZDI2NGQ0NzRkMjc2ZDQ3NGQyODdkNDc0ZDI5OGQ0NjlkMzA3ZDQ2NGQzMTZkNDUwZDMxOGQzMjBkMzE0ZDI2NGQzMTZkMjA4ZDMxOGQxNDJkMzE0ZDEzNGQ0MDBkMTI5ZDQ1OGQxMjRkNTE2ZDEyNGQ2MThkMTg4ZDYxNmQyNDRkNjEzZDMwMGQ2MTBkMzYyZDYxMGQzNjhkNjEyZDM3NGQ2MThkMzgwZDYyNGQzODBkNjM2ZDM4MGQ2NDhkMzc0ZDY1NGQzNjhkNjYwZDM2MmQ2NjJkMzAwZDY2NGQyNDJkNjY3ZDE4NGQ2NzBkMTI2ZDY3NGQxMjRkODEyZDEyNWQ4ODJkMTI2ZDk1MmQxMjZkMTAwMGQxMjBkMTAyNGQ5N2QxMDI0ZDc0ZDEwMjRkNjRkMTAwMmhSMmQ1MTJSM2Q0NzRSNGQ2NFI1ZDc2NlI2ZDBSN2Q3MDJSOGQwUjlkMTQ0UjEwaTcwUjExZDY0UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTgyb1IwZDg4MFIxYWQ0NTJkMTA5OGQ0MDZkMTA3NGQxNTRkODYwZDE0MmQ4NDZkMTU2ZDgzNGQ0MjRkNjQyZDQ1NGQ2MjhkNDUyZDgwMGQ0ODZkODAyZDU1MmQ4MDZkNTk4ZDgwNmQ2MjRkNzgwZDY0NGQ3NTZkNjQ2ZDczOGQ2NTBkNzA0ZDY0MmQyNzRkNjQwZDIwOGQ2ODBkMjA0ZDcwNmQyMDJkNzMyZDIwMGQ3NThkMTk4ZDc2MGQyNTBkNzY0ZDY5OGQ3NjJkNzM2ZDc1NGQ3NzhkNzQ2ZDgyMGQ3MTZkODU4ZDY3NGQ5MDRkNjQxZDkxMmQ2MDhkOTIwZDU4MGQ5MjBkNTE2ZDkyNGQ0NTBkOTI2ZDQ1MmQxMDk4aFIyZDEwMjRSM2Q3NjRSNGQxNTRSNWQ4MjZSNmQtNzRSN2Q2NzJSOGQwUjlkMTQ0UjEwaTE4MlIxMWQxNTRSMTJkMTAyNFIxM2FpMWkyaTJpM2kyaTJpMmkyaTJpM2kzaTNpMmkzaTNpMmkyaTNpM2kzaTNpMmkyaTJoZzo2OW9SMGQ4ODBSMWFkMTA0ZDEwMjZkOThkMTAyNGQ4OGQxMDE5ZDc4ZDEwMTRkODRkOTg2ZDg4ZDk3MmQ5MGQ5NThkOTJkOTQ0ZDkyZDg2M2Q5MmQ3ODJkOTBkNzAxZDg4ZDYyMGQ4NmQ1NTNkODRkNDg2ZDgwZDQxNmQ3NmQzNDZkNzRkMjc4ZDc2ZDI3MmQ4MmQyNjZkODhkMjYwZDk0ZDI1NmQyNzhkMjYyZDMzMmQyNjRkMzg2ZDI2NmQ0MzJkMjcyZDQ0NGQyODJkNDQ1ZDI5MGQ0NDZkMjk4ZDQ0NGQzMDlkNDQyZDMyMGQ0MjZkMzI2ZDM3MGQzMjZkMzE2ZDMyM2QyNjJkMzIwZDEzMmQzMTZkMTM0ZDM0OGQxMzdkNDE5ZDE0MGQ0OTBkMTQyZDYxNGQyODRkNjE0ZDM5MGQ2MTBkMzk2ZDYxMmQ0MDJkNjE4ZDQwOGQ2MjRkNDA4ZDYzOGQ0MDhkNjUyZDQwMmQ2NTlkMzk2ZDY2NmQzOTBkNjY4ZDI4MmQ2NzBkMTQyZDY3NGQxNDhkNzgwZDE0OWQ4NDlkMTUwZDkxOGQxNTBkOTYyZDI2NmQ5NTJkMzAzZDk1M2QzNDBkOTU0ZDQ0NGQ5NTBkNDUwZDk1MmQ0NTZkOTU4ZDQ2MmQ5NjRkNDYyZDk4MGQ0NjJkOTk2ZDQ1OGQxMDAyZDQ1NGQxMDA4ZDQ0NGQxMDEwZDM0MGQxMDEyZDI5NGQxMDEyZDI0OGQxMDEyZDIwMWQxMDE2ZDE1NGQxMDIwZDEwNGQxMDI2aFIyZDUxMlIzZDQ2MlI0ZDc0UjVkNzY4UjZkLTJSN2Q2OTRSOGQwUjlkMTQ0UjEwaTY5UjExZDc0UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE4MW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE4MVIxMWQwUjEyZDUxMlIxM2FoZzo2OG9SMGQ4ODBSMWFkODhkMTAyNGQ0NmQxMDI0ZDQ3ZDEwMDBkNDhkOTc2ZDgwZDk3MGQ4OGQ4NDRkOTJkNzM4ZDkyZDY1MGQ4MGQ2NTBkNjlkNjQ4ZDU4ZDY0NmQ1MWQ2MzZkNDRkNjI2ZDQ3ZDYxMWQ1MGQ1OTZkNjhkNTkwZDkyZDU5MmQ4NGQ0NDRkODBkMzE2ZDUyZDMxOGQ0MGQzMTBkMjhkMzAyZDI5ZDI4N2QzMGQyNzJkNTZkMjYwZDE2MGQyNTRkMjMyZDI1NGQyODhkMjcwZDM0NGQyODZkMzkzZDMzOGQ0NDJkMzkwZDQ1NmQ0NTRkNDcwZDUxOGQ0NjZkNTkwZDQ1NmQ2OTRkNDE1ZDc4N2QzNzRkODgwZDMyNGQ5MjhkMjYyZDk4OGQyMDZkMTAwNmQxNTBkMTAyNGQ4OGQxMDI0ZDI2OGQ4OTJkMzM2ZDgyNGQzNzVkNzI0ZDQxNGQ2MjRkNDA4ZDUxNGQ0MDZkNDY2ZDM4NmQ0MjRkMzY2ZDM4MmQzMzBkMzQ5ZDI5NGQzMTZkMjQ0ZDMxMGQxOTRkMzA0ZDEzOGQzMDRkMTQyZDQzNmQxNDhkNTgwZDIzNGQ1NzJkMjQ4ZDU3NGQyNzBkNTgwZDI3MGQ2MDBkMjcwZDYyMGQyNDhkNjMwZDE1MGQ2MzhkMTUwZDczMmQxNDZkODQwZDEzOGQ5NjBkMTc2ZDk1MmQyMDhkOTM4ZDI0MGQ5MjRkMjY4ZDg5MmhSMmQ1MTJSM2Q0NjZSNGQyOVI1ZDc3MFI2ZDBSN2Q3NDFSOGQwUjlkMTQ0UjEwaTY4UjExZDI5UjEyZDUxMlIxM2FpMWkzaTNpMmkyaTJpM2kzaTNpM2kyaTJpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTJpMmkzaTNpM2kyaTJpMmkyaTNpM2hnOjE4MG9SMGQ4ODBSMWFkNDM2ZDQwMmQ0MTZkMzkyZDQxMGQzODRkNDA3ZDM3NWQ0MDRkMzY2ZDQwNmQzNTZkNDM2ZDMxNGQ0NzNkMjc1ZDUxMGQyMzZkNTUwZDE5OGQ1NThkMTkwZDU2OGQxODdkNTc4ZDE4NGQ1OTBkMTg2ZDYxMGQxOTZkNjE2ZDIwNGQ2MTlkMjEzZDYyMmQyMjJkNjIwZDIzMmQ2MTBkMjUyZDU3MGQyODZkNTM0ZDMyNWQ0OThkMzY0ZDQ2MGQ0MDBkNDM2ZDQwMmhSMmQxMDI0UjNkNjIwUjRkNDA2UjVkODM4UjZkNjIyUjdkNDMyUjhkMFI5ZDE0NFIxMGkxODBSMTFkNDA2UjEyZDEwMjRSMTNhaTFpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kyaGc6NjdvUjBkODgwUjFhZDI4NmQxMDIyZDIyOGQxMDIyZDE4N2Q5OTlkMTQ2ZDk3NmQxMDJkOTE1ZDU4ZDg1NGQ0N2Q3NjBkMzZkNjY2ZDQxZDU4MGQ0NmQ0OTRkNjhkNDI2ZDkwZDM1OGQxMzBkMzE3ZDE3MGQyNzZkMjA3ZDI2NWQyNDRkMjU0ZDI3OWQyNTlkMzE0ZDI2NGQzNTBkMjc3ZDM4NmQyOTBkNDE2ZDMyNWQ0NDZkMzYwZDQ2MmQ0MDJkNDc4ZDQ0NGQ0NzRkNDk2ZDQ3MmQ1MzJkNDQ0ZDUzOGQ0MTBkNTM2ZDQxMmQ0OTZkNDEyZDQ2OGQ0MDlkNDQ3ZDQwNmQ0MjZkMzkzZDM5OWQzODBkMzcyZDM1M2QzNTFkMzI2ZDMzMGQyOTVkMzI0ZDI2NGQzMThkMjM5ZDMyNGQyMTRkMzMwZDE5NGQzNDBkMTc0ZDM1MGQxNTBkMzg2ZDEyNmQ0MjJkMTA5ZDQ5NmQ5MmQ1NzBkOTVkNjQ3ZDk4ZDcyNGQxMTBkNzkwZDEyMmQ4NTZkMTU5ZDg5N2QxOTZkOTM4ZDIzMGQ5NTFkMjY0ZDk2NGQyOTRkOTYxZDMyNGQ5NThkMzM5ZDk0N2QzNTRkOTM2ZDM3MWQ5MTdkMzg4ZDg5OGQzOTVkODcxZDQwMmQ4NDRkNDE0ZDgyMGQ0MjhkODEyZDQ0MWQ4MTZkNDU0ZDgyMGQ0NjBkODM2ZDQ2MmQ4NjZkNDQyZDkwOGQ0MjJkOTUwZDM5N2Q5NzVkMzcyZDEwMDBkMzQ2ZDEwMTJkMzIwZDEwMjRkMjg2ZDEwMjJoUjJkNTEyUjNkNDc0UjRkNDFSNWQ3NjVSNmQyUjdkNzI0UjhkMFI5ZDE0NFIxMGk2N1IxMWQ0MVIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3OW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3OVIxMWQwUjEyZDUxMlIxM2FoZzo2Nm9SMGQ4ODBSMWFkMTIwZDEwMjRkNjFkMTAyNGQ0NWQxMDEyZDIzZDk3OGQ2MWQ5NjZkNjNkODQ2ZDY1ZDcxOGQ2NmQ2NTBkNjZkNjA2ZDY2ZDU2NGQ2N2Q0MDBkNjdkMzA4ZDY2ZDI3NGQ2NWQyNjhkNjlkMjYyZDc0ZDI1N2Q4M2QyNTZkMTU0ZDI1NmQyNDZkMjU0ZDMyMGQyODBkMzk0ZDMwNmQ0MzJkMzQ5ZDQ3MGQzOTJkNDc2ZDQyMmQ0ODJkNDUyZDQ3OGQ0ODdkNDc0ZDUyMmQ0NTRkNTU1ZDQzNGQ1ODhkNDAyZDYxNmQzMzRkNjU0ZDM2NGQ2ODBkMzg3ZDcwNGQ0MTBkNzI4ZDQyNGQ3NTFkNDM4ZDc3NGQ0NDVkNzk0ZDQ1MmQ4MTRkNDUwZDg0NmQ0NDhkODc4ZDQzNmQ5MDBkNDI0ZDkyMmQzODRkOTY0ZDMzNGQxMDA2ZDI2M2QxMDE3ZDE5MmQxMDI4ZDEyMGQxMDI0ZDM0MGQ5MjhkMzcyZDkwMGQzODJkODgyZDM5MmQ4NjRkMzk0ZDg0MGQzOTZkODE2ZDM5MGQ3OTlkMzg0ZDc4MmQzNzJkNzY1ZDM2MGQ3NDhkMzQyZDcyOGQzMjNkNzA2ZDI4NmQ2NzRkMjM4ZDY3MmQxODBkNjcwZDEyMWQ2NzRkMTE2ZDgyNmQxMTZkOTYyZDEyNGQ5NjhkMTYzZDk2OGQyMDJkOTY4ZDI0NmQ5NjBkMjkwZDk1MmQzNDBkOTI4ZDM2OGQ1ODBkMzk4ZDU0NGQ0MTFkNTEyZDQyNGQ0ODBkNDE4ZDQ0MmQ0MTJkNDA0ZDM2NmQzNzBkMzIwZDMzNmQyNjVkMzI0ZDIxMGQzMTJkMTI0ZDMxNGQxMjRkNDUyZDEyM2Q2MTZkMTU2ZDYxN2QxNzZkNjE3LjVkMTk2ZDYxOGQyNDJkNjE4ZDMwMmQ2MjRkMzY4ZDU4MGhSMmQ1MTJSM2Q0NzhSNGQ0NVI1ZDc2OFI2ZDBSN2Q3MjNSOGQwUjlkMTQ0UjEwaTY2UjExZDQ1UjEyZDUxMlIxM2FpMWkzaTNpM2kyaTJpMmkyaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTc4b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTc4UjExZDBSMTJkNTEyUjEzYWhnOjY1b1IwZDg4MFIxYWQ1OGQxMDIyZDQyZDEwMTZkNDJkOTkyZDkyZDgyMmQxMzhkNjMyZDE4NGQ0NDJkMjI4ZDI2MGQyNDJkMjQyZDI1OWQyNDNkMjc2ZDI0NGQyODZkMjYyZDMzMGQ0NjRkMzc4ZDY0OWQ0MjZkODM0ZDQ4MmQxMDA0ZDQ3NmQxMDE0ZDQ2NmQxMDE5ZDQ1NmQxMDI0ZDQzOWQxMDIzZDQyMmQxMDIyZDQxMmQxMDEyZDQwMmQ5ODZkMzg3ZDkzMWQzNzJkODc2ZDM1NGQ4MjhkMjc0ZDgzMmQyNDZkODMxZDIxOGQ4MzBkMTUyZDgzMmQxMzZkODg4ZDEyNGQ5MjlkMTEyZDk3MGQ5NmQxMDE2ZDc4ZDEwMzBkNThkMTAyMmQzMzRkNzcyZDMxMGQ2ODBkMjk1ZDU4OGQyODBkNDk2ZDI1OGQ0MDJkMjMyZDQ5NGQyMTBkNTg5ZDE4OGQ2ODRkMTY4ZDc3NGQyMzJkNzc0ZDI2M2Q3NzRkMjk0ZDc3NGQzMzRkNzcyaFIyZDUxMlIzZDQ4MlI0ZDQyUjVkNzgxUjZkMVI3ZDczOVI4ZDBSOWQxNDRSMTBpNjVSMTFkNDJSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaGc6MTc3b1IwZDg4MFIxYWQxNThkMTAxMGQxMzJkOTk4ZDEyNmQ5ODZkMTI1ZDk3NWQxMjRkOTY0ZDE0OGQ5NDhkMTkyZDkzMmQ4MzhkOTM0ZDg1OGQ5NDRkODY0ZDk1MmQ4NjdkOTYxZDg3MGQ5NzBkODY4ZDk4MGQ4NThkMTAwMGQ4NTJkMTAwNmQ4NDRkMTAwOGQ4MzZkMTAxMGQ4MjhkMTAxMmQxNThkMTAxMGQ0OTRkODI0ZDQ3NGQ4MTRkNDcwZDgwOGQ0NjdkODAxZDQ2NGQ3OTRkNDYyZDc4NmQ0NjRkNTg2ZDIwMGQ1ODhkMTU2ZDU4OGQxNDhkNTg2ZDE0MWQ1ODNkMTM0ZDU4MGQxMjhkNTc2ZDEyMmQ1NjhkMTE5ZDU2MGQxMTZkNTUyZDEyMGQ1MzhkMTI4ZDUyNGQxMzhkNTE0ZDE1OGQ1MTJkMTc4ZDUxMGQyMDBkNTEwZDQ2NmQ1MDhkNDY2ZDI3MGQ0NzZkMjUwZDQ4NGQyNDRkNDkzZDI0MWQ1MDJkMjM4ZDUxMGQyNDBkNTMwZDI1MGQ1NDJkMjY4ZDU0M2QyOTNkNTQyZDUwOGQ3ODhkNTEwZDgwMmQ1MTBkODE1ZDUwN2Q4MjhkNTA0ZDg0MmQ1MDZkODYyZDUxNmQ4NjhkNTI0ZDg3MWQ1MzNkODc0ZDU0MmQ4NzJkNTUyZDg2MmQ1NzJkODQ2ZDU4MmQ4MjdkNTg1ZDgwOGQ1ODhkNzg4ZDU4OGQ1NDBkNTg2ZDUzOGQ3OTRkNTI4ZDgxNGQ1MjBkODIwZDUxMGQ4MjNkNTAwZDgyNmQ0OTRkODI0aFIyZDEwMjRSM2Q4NzJSNGQxMTlSNWQ3ODRSNmQxMlI3ZDY2NVI4ZDBSOWQxNDRSMTBpMTc3UjExZDExOVIxMmQxMDI0UjEzYWkxaTJpM2kzaTJpMmkyaTNpM2kyaTNpM2kyaTFpMmkzaTNpMmkyaTJpM2kzaTNpM2kyaTNpM2kyaTJpMmkzaTNpMmkzaTJpMmkzaTNpMmkzaTNpMmkzaTNpMmkyaTJpM2kzaGc6NjRvUjBkODgwUjFhZDMwMmQxMDc2ZDI1MGQxMDc0ZDIzMGQxMDY2ZDIxMGQxMDU4ZDE4N2QxMDQ5ZDE2NGQxMDQwZDE0MGQxMDE4ZDExNmQ5OTZkOTNkOTYwZDcwZDkyNGQ1NGQ4NTBkMzhkNzc2ZDQzZDY2OWQ0OGQ1NjJkODBkNDcyZDExMmQzODJkMTU5ZDMzNGQyMDZkMjg2ZDI1MGQyNzBkMjk0ZDI1NGQzMjZkMjU2ZDM1OGQyNThkMzg0ZDI3MWQ0MTBkMjg0ZDQzOWQzMThkNDY4ZDM1MmQ0ODBkNDAzZDQ5MmQ0NTRkNDkwZDU1MGQ0ODRkNjc2ZDQ2OGQ3MzJkNDUyZDc4OGQ0MjlkODI2ZDQwNmQ4NjRkMzg3ZDg2OWQzNjhkODc0ZDM1M2Q4NzJkMzM4ZDg3MGQzMjZkODY0ZDMxNGQ4NThkMzAyZDg1MGQyODhkODU4ZDI3N2Q4NjFkMjY2ZDg2NGQyNTlkODY0ZDI1MmQ4NjRkMjM2ZDg2MmQyMjBkODYwZDIwOGQ4NTFkMTk2ZDg0MmQxODBkODI1ZDE2NGQ4MDhkMTU2ZDc4MGQxNDhkNzUyZDE1MGQ3MjBkMTU2ZDY0MGQxODFkNTY1ZDIwNmQ0OTBkMjM0ZDQ1MWQyNjJkNDEyZDI4NWQ0MDZkMzA4ZDQwMGQzMjdkNDA0ZDM0NmQ0MDhkMzU5ZDQyMmQzNzJkNDM2ZDM4NmQ0NDZkMzgwZDQwOGQzODhkMzk4ZDM5NmQzODhkNDEyZDM4NmQzOTZkMzQ4ZDM4M2QzMzhkMzcwZDMyOGQzNThkMzI0ZDM0NmQzMjBkMzMyZDMxN2QzMThkMzE0ZDI5OWQzMTdkMjgwZDMyMGQyNTNkMzMxZDIyNmQzNDJkMTkwZDM4NGQxNTRkNDI2ZDEyN2Q1MTdkMTAwZDYwOGQ5OGQ3MTFkOTZkODE0ZDEyMGQ4NzdkMTQ0ZDk0MGQxNzdkOTY3ZDIxMGQ5OTRkMjMyZDEwMDBkMjU0ZDEwMDZkMjcxZDEwMTFkMjg4ZDEwMTZkMzEwZDEwMThkMzMyZDEwMjBkMzQ5ZDEwMTZkMzY2ZDEwMTJkMzc0ZDEwMDJkMzgyZDk5MmQzOTBkOTgzZDM5OGQ5NzRkNDA4ZDk3MGQ0MzBkOTcyZDQzNmQ5NzhkNDQyZDk4NGQ0NDRkMTAwOGQ0MzJkMTAyNGQ0MThkMTA0MWQ0MDRkMTA1OGQzODVkMTA2NGQzNjZkMTA3MGQzNDVkMTA3M2QzMjRkMTA3NmQzMDJkMTA3NmQ0MDRkNzUyZDQ0NmQ2MzBkNDM4ZDU3NmQ0MTRkNjc4ZDM5NGQ3MjRkMzc0ZDc3MGQzNTBkODEyZDM3OGQ4MTZkNDA0ZDc1MmQyNjhkODA2ZDMwMGQ3OTRkMzE0ZDc2N2QzMjhkNzQwZDM0MGQ3MDlkMzUyZDY3OGQzNjFkNjU0ZDM3MGQ2MzBkMzc2ZDYwNmQzNzJkNTY4ZDM2MWQ1MzJkMzUwZDQ5NmQzNDBkNDg2ZDMzMGQ0NzZkMzIxZDQ3MWQzMTJkNDY2ZDMwMWQ0NzBkMjkwZDQ3NGQyNzhkNDg3ZDI2NmQ1MDBkMjUzZDUzNGQyNDBkNTY4ZDIyM2Q2MjdkMjA2ZDY4NmQyMDZkNzI1ZDIwNmQ3NjRkMjE0ZDc3N2QyMjJkNzkwZDIzM2Q4MDFkMjQ0ZDgxMmQyNjhkODA2aFIyZDUxMlIzZDQ5MFI0ZDQzUjVkNzY4UjZkLTUyUjdkNzI1UjhkMFI5ZDE0NFIxMGk2NFIxMWQ0M1IxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3Nm9SMGQ4ODBSMWFkOTJkMzUzZDkyZDM5OGQxMjUuNWQ0MjYuNWQxNTlkNDU1ZDIxMGQ0NTVkMjU0ZDQ1NWQyOTEuNWQ0MjYuNWQzMjlkMzk4ZDMyOWQzNTNkMzI5ZDMwN2QyOTEuNWQyNzQuNWQyNTRkMjQyZDIxMGQyNDJkMTU5ZDI0MmQxMjUuNWQyNzQuNWQ5MmQzMDdkOTJkMzUzZDQ0ZDM1MmQ0NGQyODhkOTNkMjQyZDE0MmQxOTZkMjEyZDE5NmQyODBkMTk2ZDMzMGQyNDJkMzgwZDI4OGQzODBkMzUyZDM4MGQ0MThkMzMwZDQ2M2QyODBkNTA4ZDIxMmQ1MDhkMTQyZDUwOGQ5M2Q0NjNkNDRkNDE4ZDQ0ZDM1MmhSMmQxMDI0UjNkMzgwUjRkNDRSNWQ4MjhSNmQ1MTZSN2Q3ODRSOGQwUjlkMTQ0UjEwaTE3NlIxMWQ0NFIxMmQxMDI0UjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjYzb1IwZDg4MFIxYWQyMzZkMTExMGQyMTRkMTExMGQxOTNkMTEwM2QxNzJkMTA5NmQxNTZkMTA3OGQxNDJkMTA2MmQxMzZkMTA0NGQxMzBkMTAyNmQxMzBkMTAwNmQxMzBkOTg4ZDE0MGQ5NzBkMTUwZDk1MmQxNjhkOTQwZDE5MGQ5MjRkMjI2ZDkyMGQyNTBkOTE4ZDI3MGQ5MjJkMjkwZDkyNmQzMDZkOTM2ZDMyNmQ5NDhkMzM2ZDk2NGQzNDZkOTgwZDM0OGQxMDEyZDM0NmQxMDQyZDMzNmQxMDYwZDMyNGQxMDgwZDMwN2QxMDkxZDI5MGQxMTAyZDI3NGQxMTA2ZDI1MmQxMTEwZDIzNmQxMTEwZDIyMGQ4MDhkMjEwZDc5NGQyMDdkNzc2ZDIwNGQ3NThkMjA4ZDczNmQyMTJkNzE0ZDIzNmQ2ODFkMjYwZDY0OGQyOThkNjI4ZDMzNmQ2MDhkMzY2ZDU3M2QzOTZkNTM4ZDQwOWQ1MDVkNDIyZDQ3MmQ0MjJkNDUzZDQyMmQ0MzRkNDE4ZDQxMGQ0MTRkMzg2ZDQwM2QzNjVkMzkyZDM0NGQzNzNkMzI2ZDM1NGQzMDhkMzIxZDMwMWQyODhkMjk0ZDI1M2QyOTlkMjE4ZDMwNGQxOTFkMzIyZDE2NGQzNDBkMTQyZDM2M2QxMjBkMzg2ZDEwOWQ0MTFkOThkNDM2ZDEwMWQ0NThkMTA0ZDQ4MGQxMDlkNDkzZDExNGQ1MDZkMTI0ZDUxNmQxMzRkNTI2ZDE0NWQ1MzJkMTU2ZDUzOGQxNjJkNTUwZDE2NGQ1NjZkMTUyZDU4MGQxMzhkNTg4ZDExOGQ1ODZkMTAyZDU3NmQ4N2Q1NjNkNzJkNTUwZDYyZDUzMmQ1MmQ1MTRkNDdkNDkzZDQyZDQ3MmQ0M2Q0MzhkNDRkNDA0ZDY0ZDM3MGQ4NGQzMzZkMTIwZDMwMWQxNTZkMjY2ZDIwN2QyNTBkMjU4ZDIzNGQzMDRkMjQwZDM1MGQyNDZkMzc0ZDI1OWQzOThkMjcyZDQxOWQyOTRkNDQwZDMxNmQ0NTdkMzQ3ZDQ3NGQzNzhkNDc3ZDQxNGQ0ODBkNDUwZDQ3NWQ0ODVkNDcwZDUyMGQ0NDdkNTYxZDQyNGQ2MDJkMzkxZDYyOGQzNThkNjU0ZDMyN2Q2NzJkMjk2ZDY5MGQyODRkNzExZDI3MmQ3MzJkMjY4ZDc0NWQyNjRkNzU4ZDI2NGQ3NjJkMjY0ZDc2NmQyNjhkNzc1ZDI3MmQ3ODRkMjcwZDc5NmQyNjRkODEwZDI1MGQ4MTZkMjM0ZDgxNGQyMjBkODA4aFIyZDUxMlIzZDQ3N1I0ZDQzUjVkNzg0UjZkLTg2UjdkNzQxUjhkMFI5ZDE0NFIxMGk2M1IxMWQ0M1IxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE3NW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3NVIxMWQwUjEyZDUxMlIxM2FoZzo2Mm9SMGQ4ODBSMWFkMzhkMTAwOGQzODhkNjYwZDY0ZDM0NGQ1MmQzMzBkMzZkMzEyZDE0ZDI2MmQ2NmQyNjhkNzhkMjgwZDk4ZDMwMGQ0NDBkNjQwZDQ1MGQ2NTBkNDUyZDY1OGQ0NTRkNjY4ZDQyNGQ2OTZkNzRkMTA1MGQyNmQxMDYwZDM4ZDEwMDhoUjJkNTEyUjNkNDUyUjRkMzZSNWQ3NTZSNmQtMjZSN2Q3MjBSOGQwUjlkMTQ0UjEwaTYyUjExZDM2UjEyZDUxMlIxM2FpMWkyaTJpM2kzaTNpMmkzaTNpMmkzaGc6MTc0b1IwZDg4MFIxYWQxNGQ2MDZkMThkNTU4ZDM1ZDUyMmQ4OWQ0MjBkMTc0ZDM5MWQyNzRkMzUwZDM3MmQ0MTBkNDY1ZDQ2OWQ0ODhkNTQ1ZDUxOGQ2NjJkNDU3ZDc3MmQ0MjNkODIyZDM1NWQ4NDhkMjU1ZDg4M2QxNDNkODM3ZDc2ZDgwNGQ0M2Q3NTRkOWQ2OTVkMTNkNjI0ZDE0ZDYwNmQ0N2Q2NjJkNTJkNzE0ZDk2LjVkNzYzLjVkMTQxZDgxM2QyMzFkODMwZDI5NGQ4MzdkMzYwZDgxMWQ0MjlkNzcxZDQ1MGQ3MTFkNDc4ZDYxNWQ0NDlkNTMzZDQwMmQ0NTVkMzE5ZDQxOWQyMjVkMzk2ZDE1MmQ0MzkuNWQ3OWQ0ODNkNTJkNTc4ZDQ3ZDYxNGQ0NGQ2MzFkNDdkNjYyZDM0OWQ3OTBkMzEzZDc2MWQyODhkNzMwLjVkMjYzZDcwMGQyMzhkNjY5ZDIyMGQ2NzFkMjEzLjVkNjcyLjVkMjA3ZDY3NGQxNzhkNjcxZDE3M2Q3NTZkMTczZDc3MWQxNzNkNzg0ZDE3MC41ZDc4N2QxNjhkNzkwZDE2MWQ3OTBkMTU0ZDc5MGQxNTEuNWQ3ODYuNWQxNDlkNzgzZDE0OWQ3NzJkMTQ5ZDc1NmQxNTBkNjg0LjVkMTUxZDYxM2QxNTNkNTYwZDE1NWQ1MDdkMTY1ZDQ1NmQxNjhkNDU0ZDE3MC41ZDQ1MmQxNzNkNDUwZDE3OGQ0NTBkMTg3ZDQ1NmQyMTdkNDU2ZDIzNWQ0NTguNWQyNTNkNDYxZDI3OGQ0NjguNWQzMDNkNDc2ZDMxOWQ0OTNkMzM1ZDUxMGQzNDRkNTMwLjVkMzUzZDU1MWQzNTEuNWQ1NzNkMzUwZDU5NWQzNDJkNjEwLjVkMzM0ZDYyNmQzMjAuNWQ2MzUuNWQzMDdkNjQ1ZDI5N2Q2NTFkMjg3ZDY1N2QyNzJkNjYwZDI5MGQ2OTVkMzIwZDcyNWQzNTBkNzU1ZDM3MWQ3NzRkMzgxZDc4NmQzNzRkNzg4ZDM2N2Q3OTBkMzYyZDc5MGQzNTdkNzkwZDM0OWQ3OTBkMjg4ZDYyMGQzMDVkNjEwZDMxMWQ1OTkuNWQzMTdkNTg5ZDMxOC41ZDU3NC41ZDMyMGQ1NjBkMzE3LjVkNTQ2LjVkMzE1ZDUzM2QzMDkuNWQ1MjFkMzA0ZDUwOWQyOTBkNDk5ZDI3NmQ0ODlkMjYxLjVkNDgzLjVkMjQ3ZDQ3OGQyMzAuNWQ0NzcuNWQyMTRkNDc3ZDE5MmQ0NzdkMTg2ZDUyMmQxODNkNTYxZDE4MGQ2MDBkMTgwZDY0MmQxODlkNjQ0ZDE5Ny41ZDY0NGQyMDZkNjQ0ZDIxNmQ2NDMuNWQyMjZkNjQzZDI0NWQ2MzdkMjY0ZDYzMWQyODhkNjIwaFIyZDUxMlIzZDQ4OFI0ZDEzUjVkNjMzUjZkMTc2UjdkNjIwUjhkMFI5ZDE0NFIxMGkxNzRSMTFkMTNSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kyaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6NjFvUjBkODgwUjFhZDkyZDgwNGQ3MmQ4MDRkNjVkNzkwZDU4ZDc3NmQ2NGQ3NjNkNzBkNzUwZDkyZDc0OGQzMzJkNzQ4ZDQxNmQ3NDhkNDM4ZDc1MGQ0NDNkNzYzZDQ0OGQ3NzZkNDQwZDc4OGQ0MzJkODAwZDQxNmQ4MDRkMzMwZDgwNGQ5MmQ4MDRkOTJkNTc0ZDc2ZDU3NGQ2N2Q1NjBkNThkNTQ2ZDY1ZDUzM2Q3MmQ1MjBkOTJkNTE2ZDM0NGQ1MTZkNDE2ZDUxNmQ0NDBkNTIyZDQ0NWQ1MzNkNDUwZDU0NGQ0NDNkNTU4ZDQzNmQ1NzJkNDE2ZDU3MmQzNDRkNTc2ZDkyZDU3NGhSMmQ1MTJSM2Q0NDVSNGQ2NFI1ZDUwOFI2ZDIyMFI3ZDQ0NFI4ZDBSOWQxNDRSMTBpNjFSMTFkNjRSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjE3M29SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3M1IxMWQwUjEyZDUxMlIxM2FoZzo2MG9SMGQ4ODBSMWFkNDM0ZDEwNTZkNDZkNjg2ZDQwZDY3MmQ0OGQ2NjBkNDQ2ZDI2MGQ0NjRkMjYyZDQ3OGQyNzhkNDc4ZDI5NmQ5OGQ2NzJkNDcyZDEwMTJkNDc0ZDEwMzZkNDU4ZDEwNTRkNDM0ZDEwNTZoUjJkNTEyUjNkNDc4UjRkNDBSNWQ3NjRSNmQtMzJSN2Q3MjRSOGQwUjlkMTQ0UjEwaTYwUjExZDQwUjEyZDUxMlIxM2FpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE3Mm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3MlIxMWQwUjEyZDUxMlIxM2FoZzo1OW9SMGQ4ODBSMWFkMjY0ZDQ4MGQyNDZkNDgwZDIzNGQ0NzhkMjIyZDQ3NmQyMTBkNDcwZDE5OGQ0NjRkMTkyZDQ1NGQxODZkNDQ2ZDE4NmQ0MjhkMTg2ZDQwNmQyMDJkMzkyZDIyMGQzODBkMjM0ZDM3OGQyNDhkMzc2ZDI2NGQzNzZkMjk2ZDM3NmQzMTRkMzg2ZDMyOGQzOTRkMzM0ZDQwM2QzNDBkNDEyZDM0MmQ0MjhkMzQyZDQ0NmQzMzBkNDYwZDMyMmQ0NjhkMzE2ZDQ3MWQzMTBkNDc0ZDMwMmQ0NzZkMjg4ZDQ4MGQyNjRkNDgwZDE1NGQxMTIwZDEzMmQxMTAwZDE1NGQxMDcyZDE3NmQxMDU4ZDE5MmQxMDUwZDIxMmQxMDMyZDIzMGQxMDE4ZDI2NGQ5NzZkMjc0ZDk2MGQyMDBkOTU4ZDE3MmQ5MjZkMTQ4ZDkwMGQxNDZkODY0ZDE1NGQ4MjBkMTg2ZDc5NGQyMjBkNzY2ZDI3MmQ3NjZkMzI0ZDc2NGQzNjhkODA0ZDQwMGQ4NDRkMzg4ZDg5NmQzNjRkOTQ4ZDMyMmQ5OTZkMjg4ZDEwMzZkMjU2ZDEwNjhkMjQwZDEwODRkMjI4ZDEwOTJkMjE3ZDExMDFkMjA2ZDExMTBkMTkwZDExMjJkMTYwZDExMjZkMTU0ZDExMjBoUjJkNTEyUjNkMzg4UjRkMTQ2UjVkNjQ4UjZkLTk4UjdkNTAyUjhkMFI5ZDE0NFIxMGk1OVIxMWQxNDZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2hnOjE3MW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3MVIxMWQwUjEyZDUxMlIxM2FoZzo1OG9SMGQ4ODBSMWFkMzA0ZDM3MmQzMjZkMzk0ZDMyNmQ0NjJkMzA0ZDQ4NGQyMzZkNDg0ZDIxNGQ0NjJkMjE0ZDM5NmQyMzZkMzcyZDMwNGQzNzJkMzAwZDgwMGQzMjJkODIyZDMyMmQ4ODJkMzAwZDkwNGQyNDBkOTA0ZDIxOGQ4ODJkMjE4ZDgyNGQyNDBkODAwZDMwMGQ4MDBoUjJkNTEyUjNkMzI2UjRkMjE0UjVkNjUyUjZkMTIwUjdkNDM4UjhkMFI5ZDE0NFIxMGk1OFIxMWQyMTRSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE3MG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE3MFIxMWQwUjEyZDUxMlIxM2FoZzo1N29SMGQ4ODBSMWFkNDhkNDk3ZDQ4ZDQwMGQxMDdkMzMwZDE2NmQyNjBkMjQ5ZDI2MGQzMzFkMjYwZDM5MWQzMzBkNDUxZDQwMGQ0NTFkNDk3ZDQ1MWQ1MjNkNDQ3ZDU0NmQ0MzRkNjMxZDM5OGQ3NTNkMzYwZDg4MWQzMDJkMTAyMmQyOTRkMTAzNGQyNjguNWQxMDI5ZDI0M2QxMDI0ZDI0M2QxMDA3ZDMwNGQ4NzBkMzQzZDc0MWQzNDlkNzE5ZDM1NWQ2OThkMzA4ZDczM2QyNDlkNzMzZDE2NmQ3MzNkMTA3ZDY2NGQ0OGQ1OTVkNDhkNDk3ZDEwOWQ0OTlkMTA5ZDU3MmQxNTBkNjIzZDE5MWQ2NzRkMjQ5ZDY3NGQzMDdkNjc0ZDM1MC41ZDYyM2QzOTRkNTcyZDM5NGQ0OTlkMzk0ZDQyNmQzNTAuNWQzNzNkMzA3ZDMyMGQyNDlkMzIwZDE5MWQzMjBkMTUwZDM3M2QxMDlkNDI2ZDEwOWQ0OTloUjJkNTEyUjNkNDUxUjRkNDhSNWQ3NjRSNmQtNVI3ZDcxNlI4ZDBSOWQxNDRSMTBpNTdSMTFkNDhSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2hnOjE2OW9SMGQ4ODBSMWFkMjUyZDgwMmQyMjZkODAyZDIwMy41ZDc5MC41ZDE4MWQ3NzlkMTU5ZDc1My41ZDEzN2Q3MjhkMTI4LjVkNjg3ZDEyMGQ2NDZkMTIyZDYwOS41ZDEyNGQ1NzNkMTM2LjVkNTQ1ZDE0OWQ1MTdkMTcwLjVkNDk1LjVkMTkyZDQ3NGQyMTdkNDY0LjVkMjQyZDQ1NWQyNjcuNWQ0NTcuNWQyOTNkNDYwZDMxMmQ0NjhkMzMxZDQ3NmQzNDMuNWQ0OTMuNWQzNTZkNTExZDM2N2Q1MjZkMzc4ZDU0MWQzNzhkNTY0ZDM3NmQ1NjhkMzcyZDU3Mi41ZDM2OGQ1NzdkMzYzZDU3OGQzNTJkNTc4ZDM0OWQ1NzdkMzQ1LjVkNTcyLjVkMzQyZDU2OGQzNDFkNTY0ZDMzNGQ1NDlkMzI2LjVkNTM0LjVkMzE5ZDUyMGQzMDZkNTEwZDI5M2Q1MDBkMjc4ZDQ5Ny41ZDI2M2Q0OTVkMjQ4LjVkNDk3ZDIzNGQ0OTlkMjE4ZDUwNmQyMDJkNTEzZDE4OWQ1MzEuNWQxNzZkNTUwZDE2NS41ZDU3N2QxNTVkNjA0ZDE1Ni41ZDYzNC41ZDE1OGQ2NjVkMTY4ZDY5Mi41ZDE3OGQ3MjBkMTk2LjVkNzM2ZDIxNWQ3NTJkMjM2ZDc1Ny41ZDI1N2Q3NjNkMjcxLjVkNzYwLjVkMjg2ZDc1OGQzMDAuNWQ3NDhkMzE1ZDczOGQzMjNkNzI3LjVkMzMxZDcxN2QzMzQuNWQ3MTBkMzM4ZDcwM2QzNDVkNjkxZDM1MmQ2ODJkMzY0ZDY4N2QzNzhkNjkxZDM3NmQ3MDZkMzczZDcyOWQzNjRkNzQwZDM1NWQ3NTFkMzM4ZDc2Ny41ZDMyMWQ3ODRkMjk5LjVkNzkzZDI3OGQ4MDJkMjUyZDgwMmQxOWQ2MTJkMjNkNTU5ZDM5ZDUxOWQ5MmQ0MDZkMTc3ZDM3M2QyNzRkMzMyZDM3MmQzOTVkNDYyZDQ1OWQ0ODZkNTQ0ZDUxNWQ2NzNkNDU0ZDc5NmQ0MjFkODUyZDM1NGQ4ODBkMjU2ZDkxNWQxNDdkODY5ZDgxZDgzNGQ0N2Q3NzdkMTRkNzExZDE4ZDYzM2QxOWQ2MTJkNTBkNjczZDU2ZDczMWQxMDAuNWQ3ODUuNWQxNDVkODQwZDIzM2Q4NjBkMjk0ZDg2OWQzNThkODM4ZDQyOGQ3OTVkNDQ3ZDcyOGQ0NzZkNjIwZDQ0NmQ1MjlkNDAxZDQ0NGQzMjBkNDA1ZDIyNmQzNzhkMTU1ZDQyNmQ4NGQ0NzRkNTZkNTgyZDUwZDYxOWQ0OGQ2MzlkNTBkNjczaFIyZDUxMlIzZDQ4NlI0ZDE4UjVkNjUxUjZkMTQ0UjdkNjMzUjhkMFI5ZDE0NFIxMGkxNjlSMTFkMThSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkxaTNpM2kzaTNpM2kzaTNpM2kzaTJoZzo1Nm9SMGQ4ODBSMWFkNDRkODEzZDQ0ZDcyN2QxMDdkNjY0ZDEzN2Q2MzRkMTc0ZDYxOGQxNDZkNjA0ZDEyMmQ1ODBkNjVkNTI1ZDY1ZDQ0NmQ2NWQzNjhkMTIxLjVkMzEyZDE3OGQyNTZkMjU3ZDI1NmQzMzVkMjU2ZDM5MmQzMTJkNDQ5ZDM2OGQ0NDlkNDQ2ZDQ0OWQ1MjVkMzkyZDU4MGQzNjdkNjA1ZDMzOWQ2MThkMzc1ZDYzNGQ0MDdkNjY0ZDQ3MGQ3MjdkNDcwZDgxM2Q0NzBkOTAxZDQwNi41ZDk2MmQzNDNkMTAyM2QyNTdkMTAyM2QxNjlkMTAyM2QxMDYuNWQ5NjJkNDRkOTAxZDQ0ZDgxM2QxMjJkNDQ4ZDEyMmQ1MDRkMTYxLjVkNTQzLjVkMjAxZDU4M2QyNTdkNTgzZDMxMmQ1ODNkMzUyLjVkNTQzLjVkMzkzZDUwNGQzOTNkNDQ4ZDM5M2QzOTNkMzUyLjVkMzUyLjVkMzEyZDMxMmQyNTdkMzEyZDIwMWQzMTJkMTYxLjVkMzUyLjVkMTIyZDM5M2QxMjJkNDQ4ZDEwNWQ4MTNkMTA1ZDg3NWQxNTBkOTIwZDE5NWQ5NjVkMjU3ZDk2NWQzMjBkOTY1ZDM2N2Q5MjBkNDE0ZDg3NWQ0MTRkODEzZDQxNGQ3NTBkMzY3ZDcwM2QzMjBkNjU2ZDI1N2Q2NTZkMTk1ZDY1NmQxNTBkNzAzZDEwNWQ3NTBkMTA1ZDgxM2hSMmQ1MTJSM2Q0NzBSNGQ0NFI1ZDc2OFI2ZDFSN2Q3MjRSOGQwUjlkMTQ0UjEwaTU2UjExZDQ0UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTY4b1IwZDg4MFIxYWQyODhkMjcyZDI4OGQyMzhkMzEzZDIxM2QzMzhkMTg4ZDM3NmQxODhkNDEyZDE4OGQ0MzhkMjEzZDQ2NGQyMzhkNDY0ZDI3MmQ0NjRkMzA4ZDQzOGQzMzJkNDEyZDM1NmQzNzZkMzU2ZDMzOGQzNTZkMzEzZDMzMmQyODhkMzA4ZDI4OGQyNzJkNTUyZDI3MmQ1NTJkMjM4ZDU3OWQyMTNkNjA2ZDE4OGQ2NDRkMTg4ZDY4MGQxODhkNzA4ZDIxM2Q3MzZkMjM4ZDczNmQyNzJkNzM2ZDMwOGQ3MDhkMzMyZDY4MGQzNTZkNjQ0ZDM1NmQ2MDZkMzU2ZDU3OWQzMzJkNTUyZDMwOGQ1NTJkMjcyaFIyZDEwMjRSM2Q3MzZSNGQyODhSNWQ4MzZSNmQ2NjhSN2Q1NDhSOGQwUjlkMTQ0UjEwaTE2OFIxMWQyODhSMTJkMTAyNFIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNoZzo1NW9SMGQ4ODBSMWFkMzg0ZDMxMmQzMzBkNDMzZDI3M2Q2MjZkMjE2ZDgxOWQxODlkOTQwZDE4MmQ5NzFkMTc5LjVkOTgzZDE3N2Q5OTVkMTc3ZDEwMDVkMTgwZDEwMjBkMjAyZDEwMjJkMjI0ZDEwMjRkMjM0ZDEwMTFkMjM4ZDEwMDFkMjQwZDk4OGQyNDJkOTc1ZDI0OWQ5NDBkMjc0ZDgzM2QzMjkuNWQ2NDRkMzg1ZDQ1NWQ0NDhkMzEyZDQ1NGQyOTdkNDU0ZDI4N2Q0NTRkMjc3ZDQ0NGQyNjhkNDM4ZDI2M2Q0MjVkMjU5LjVkNDEyZDI1NmQzOTBkMjU0ZDE2NWQyNTRkMTI0ZDI1N2QxMDNkMjYzLjVkODJkMjcwZDY5ZDI4MmQ2NGQyOTNkNzJkMzEwLjVkODBkMzI4ZDk0ZDMyOGQxMDhkMzIyZDEyMC41ZDMxOGQxMzNkMzE0ZDE1MmQzMTJkMzg0ZDMxMmhSMmQ1MTJSM2Q0NTRSNGQ2OVI1ZDc3MFI2ZDJSN2Q3MDFSOGQwUjlkMTQ0UjEwaTU1UjExZDY5UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaGc6MTY3b1IwZDg4MFIxYWQ0NTRkMTEwOGQ0MjRkMTEwNmQzOThkMTA5NGQzNzJkMTA4MmQzNDhkMTA2MmQzMjhkMTA0MmQzMjZkMTAxM2QzMjRkOTg0ZDMyNGQ5NTRkMzI2ZDk0NmQzMjlkOTM5ZDMzMmQ5MzJkMzM2ZDkyNmQzNDRkOTIwZDM1M2Q5MTdkMzYyZDkxNGQzNzJkOTE2ZDM5MmQ5MjZkNDA0ZDk0MmQ0MDNkOTY0ZDQwMmQ5ODZkNDAyZDEwMDhkNDI2ZDEwMjZkNDU2ZDEwMjlkNDg2ZDEwMzJkNTIwZDEwMzBkNTQ4ZDEwMjhkNTc0ZDEwMjJkNjAwZDEwMTZkNjIwZDk5MmQ2MjRkOTg2ZDYyNGQ5NzhkNjI0ZDk3MGQ2MjRkOTYyZDYxMmQ5MzZkNTQ0ZDg4OGQ0NjRkODcxZDM4NGQ4NTRkMzIyZDc5NGQzMDZkNzc2ZDMwMGQ3NTVkMjk0ZDczNGQyOTZkNzA4ZDMwMmQ2NzZkMzE0ZDY0N2QzMjZkNjE4ZDM1MmQ1OTZkMzc4ZDU4MmQzMzBkNTU0ZDMwOGQ1MzRkMzAyZDUwNmQyOTZkNDc4ZDI5OGQ0NDhkMzAyZDQyMGQzMThkMzk3ZDMzNGQzNzRkMzUyZDM1MmQzODBkMzMwZDQxMmQzMjBkNDQ0ZDMxMGQ0ODJkMzEwZDUzMmQzMTZkNTc5ZDMyNWQ2MjZkMzM0ZDY2NmQzNjBkNjgwZDM3OGQ2OTRkMzk2ZDcwOGQ0MTRkNzA0ZDQzOGQ2OTRkNDU4ZDY4NmQ0NjRkNjc3ZDQ2N2Q2NjhkNDcwZDY1OGQ0NjhkNjM4ZDQ1OGQ2MzJkNDUwZDYyOWQ0NDBkNjI2ZDQzMGQ2MTZkNDIyZDU4MGQ0MDJkNTM4ZDM5NmQ0OTZkMzkwZDQ1NGQzODhkNDQwZDM5MmQ0MjdkMzk4ZDQxNGQ0MDRkNDAyZDQxNGQzOTBkNDI4ZDM4MmQ0NDRkMzc0ZDQ2MGQzNzZkNDgwZDM4MGQ0OTJkNDQ0ZDUyMmQ1MTNkNTQ5ZDU4MmQ1NzZkNjQyZDYxNmQ2NjRkNjM4ZDY4NGQ2NjRkNjkwZDY5M2Q2OTZkNzIyZDY5NGQ3NTRkNjkyZDc3MmQ2ODJkNzg3ZDY3MmQ4MDJkNjYyZDgxNmQ2MTJkODQ0ZDYzMGQ4NTRkNjQ2ZDg2NWQ2NjJkODc2ZDY3OGQ4OTBkNjkwZDkxMmQ2OTdkOTM3ZDcwNGQ5NjJkNzAyZDk5MGQ3MDBkMTAwNmQ2OTRkMTAyMGQ2ODhkMTAzNGQ2NzhkMTA0NmQ2MzZkMTA5NGQ1NzdkMTEwMmQ1MThkMTExMGQ0NTRkMTEwOGQ0OTZkNzk4ZDUwNGQ3ODBkNTMwZDc2OGQ1NThkNzY4ZDU4NmQ3NjhkNjEwZDc1NmQ2MTRkNzQ4ZDYxNWQ3MzlkNjE2ZDczMGQ2MTZkNzIwZDYxNGQ3MDhkNjA3ZDY5N2Q2MDBkNjg2ZDU4OGQ2NzZkNDk0ZDYyOGQ0NjhkNjM2ZDQ0MmQ2NDFkNDE2ZDY0NmQzOTRkNjY4ZDM4NGQ2ODJkMzc5ZDY5N2QzNzRkNzEyZDM3NGQ3MzBkMzg0ZDc1MGQ0MDNkNzYxZDQyMmQ3NzJkNDQwZDc4MmQ0OTZkNzk4aFIyZDEwMjRSM2Q3MDRSNGQyOTZSNWQ3MTRSNmQtODRSN2Q0MThSOGQwUjlkMTQ0UjEwaTE2N1IxMWQyOTZSMTJkMTAyNFIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMWkyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmhnOjU0b1IwZDg4MFIxYWQxMTZkNzkyZDExNmQ4NjdkMTU3ZDkxOC41ZDE5OGQ5NzBkMjU4ZDk3MGQzMTVkOTcwZDM1Ny41ZDkxOC41ZDQwMGQ4NjdkNDAwZDc5MmQ0MDBkNzIxZDM1Ny41ZDY2Ny41ZDMxNWQ2MTRkMjU4ZDYxNGQxOThkNjE0ZDE1N2Q2NjcuNWQxMTZkNzIxZDExNmQ3OTJkMTYyZDQzN2QxNDhkNDY4ZDEyOGQ1NTVkMTIwZDU4OGQxMTZkNjMwZDE3NWQ1NjJkMjU4ZDU2MmQzNDBkNTYyZDQwMGQ2MzAuNWQ0NjBkNjk5ZDQ2MGQ3OTNkNDYwZDg4OWQ0MDBkOTU2LjVkMzQwZDEwMjRkMjU4ZDEwMjRkMTc0ZDEwMjRkMTE1ZDk1Ni41ZDU2ZDg4OWQ1NmQ3OTNkNTFkNjM4ZDcxZDU0OWQ5MGQ0NjBkMTA4ZDQxMmQxMjJkMzc1ZDEzOWQzNDYuNWQxNTZkMzE4ZDE4M2QyOTNkMjEwZDI3M2QyMjQuNWQyNjdkMjM5ZDI2MWQyNjBkMjU4ZDI3NWQyNTZkMjg1ZDI1NmQyOTVkMjU2ZDMxNWQyNTdkMzQyZDI2MGQzNjEuNWQyNjkuNWQzODFkMjc5ZDQwNGQzMDBkNDIwZDMxOWQ0MzFkMzM1ZDQ0MmQzNTFkNDU0ZDM4MGQ0NTVkMzkyZDQzNmQ0MDFkNDE3ZDQxMGQ0MDRkNDAyZDM5NGQzODRkMzg3ZDM2OS41ZDM4MGQzNTVkMzY3ZDM0MmQzNTFkMzI4ZDMzOWQzMjEuNWQzMjdkMzE1ZDMwOGQzMTNkMjkzZDMxMmQyODEuNWQzMTMuNWQyNzBkMzE1ZDI1NmQzMThkMjQ0ZDMyMmQyMzUuNWQzMjYuNWQyMjdkMzMxZDIxMmQzNDVkMTk3ZDM2M2QxODZkMzg0ZDE3NWQ0MDVkMTYyZDQzN2hSMmQ1MTJSM2Q0NjBSNGQ1NlI1ZDc2OFI2ZDBSN2Q3MTJSOGQwUjlkMTQ0UjEwaTU0UjExZDU2UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE2Nm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE2NlIxMWQwUjEyZDUxMlIxM2FoZzo1M29SMGQ4ODBSMWFkNjZkODAxZDcxZDc5MGQ4OGQ3ODdkMTA4ZDc4N2QxMjNkNzkxZDEyNGQ4MDFkMTIwZDg1OGQxNTlkOTEzLjVkMTk4ZDk2OWQyNTJkOTY2ZDMwM2Q5NjlkMzQ0ZDkxMy41ZDM4NWQ4NThkMzg5ZDc4NWQzOTNkNjk0ZDM1Ny41ZDY0Ny41ZDMyMmQ2MDFkMjUyZDYwMWQxOTdkNjAyZDE0NmQ2MzJkMTA5ZDY1M2Q5MmQ2NDhkNzlkNjQwZDgwZDYyNGQ4MGQyNjJkODRkMjQ4ZDEwNi41ZDI0OWQxMjlkMjUwZDE0NGQyNjJkMTQ0ZDI2NWQ0NDRkMjY1ZDQ2MWQyNjhkNDYwLjVkMjk1ZDQ2MGQzMjJkNDQ0ZDMyNWQxNDRkMzI1ZDE0NGQ1NjlkMTk5ZDU0M2QyNTJkNTQ0ZDM1MWQ1NDRkNDAwLjVkNjA1LjVkNDUwZDY2N2Q0NDZkNzg1ZDQ0MmQ4NzlkMzg0ZDk1Mi41ZDMyNmQxMDI2ZDI1MmQxMDIzZDE3NmQxMDI2ZDExOWQ5NTIuNWQ2MmQ4NzlkNjZkODAxaFIyZDUxMlIzZDQ2MVI0ZDY2UjVkNzc1UjZkMVI3ZDcwOVI4ZDBSOWQxNDRSMTBpNTNSMTFkNjZSMTJkNTEyUjEzYWkxaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTJpMmkzaTNpMmkyaTNpM2kzaTNpM2kzaTNoZzoxNjVvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxNjVSMTFkMFIxMmQ1MTJSMTNhaGc6NTJvUjBkODgwUjFhZDMzMGQzNzRkMzMwZDc3N2QxMTNkNzc3ZDExOGQ3NTFkMTIxZDczNy41ZDEyNGQ3MjRkMTMwZDcwNGQxNjNkNTkyZDIwMGQ1MDJkMjM3ZDQxMmQyODZkMzIyZDI5NmQzMDVkMzExZDI3OWQzMTNkMjY0ZDI5M2QyNTIuNWQyNzNkMjQxZDI2MmQyNTBkMjQ0ZDI3N2QyMzFkMzAyZDE3NWQ0MDRkMTQxLjVkNDg2ZDEwOGQ1NjhkNzJkNjg4ZDY2ZDcxMGQ2MGQ3MzMuNWQ1NGQ3NTdkNDlkNzgwZDQ1ZDc5NGQ0My41ZDgwN2Q0MmQ4MjBkNTBkODI4ZDY0ZDgzNGQzMzBkODM0ZDMzMGQxMDAwZDMzMGQxMDE0ZDMzOWQxMDI1ZDM2MGQxMDI0ZDM4MWQxMDIzZDM4OGQxMDE0ZDM4OGQ5OTZkMzg4ZDgzNGQ0NjRkODM0ZDQ3OWQ4MjlkNDc5ZDgwNmQ0NzlkNzgzZDQ2NGQ3NzdkMzg4ZDc3N2QzODhkMzc2ZDM4NGQzNTZkMzU5LjVkMzU2ZDMzNWQzNTZkMzMwZDM3NGhSMmQ1MTJSM2Q0NzlSNGQ0M1I1ZDc3NFI2ZDBSN2Q3MzFSOGQwUjlkMTQ0UjEwaTUyUjExZDQzUjEyZDUxMlIxM2FpMWkyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpMmkyaTJpM2kzaTJpMmkyaTNpM2kyaTJpM2kzaGc6MTY0b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMTY0UjExZDBSMTJkNTEyUjEzYWhnOjUxb1IwZDg4MFIxYWQyMzRkMTAyNGQxODZkMTAyMmQxNTRkMTAwNGQxMjJkOTg2ZDkyZDk0OGQ3MmQ5MTZkNjhkODc4ZDY0ZDg0MGQ2NmQ4MDBkNzBkNzc2ZDk2ZDc3MmQxMjJkNzc0ZDEyMmQ3OThkMTIyZDg1MGQxMjRkODc0ZDEyNmQ4OThkMTQyZDkyMGQxNThkOTQ2ZDE5MGQ5NTdkMjIyZDk2OGQyNTZkOTY2ZDI4MGQ5NjRkMjk1ZDk1NmQzMTBkOTQ4ZDMyOGQ5MjhkMzYwZDg5NGQzNzBkODYxZDM4MGQ4MjhkMzc0ZDc4MmQzNjZkNzU2ZDM0OWQ3MzRkMzMyZDcxMmQzMTFkNjk3ZDI5MGQ2ODJkMjU2ZDY2OGQyMTZkNjU0ZDIwOGQ2MzZkMjEyZDYyNmQyMjhkNjE2ZDI1NGQ2MDJkMjc0ZDU5OGQzMDZkNTg0ZDMzMmQ1NjZkMzU0ZDUzOGQzNjRkNTA1ZDM3NGQ0NzJkMzcwZDQzMmQzNjJkMzk2ZDM1MWQzNzZkMzQwZDM1NmQzMjJkMzQwZDMwNGQzMjRkMjg3ZDMxOWQyNzBkMzE0ZDI1MGQzMTZkMjMwZDMyMGQyMTJkMzMwZDE5NGQzNDBkMTc1ZDM1OWQxNTZkMzc4ZDE0NGQ0MDJkMTMyZDQyNmQxMzFkNDQyZDEzMGQ0NThkMTI4ZDQ2NmQxMThkNDc2ZDEwMmQ0NzJkODZkNDY4ZDgyZDQ1MmQ3NmQ0MzhkODBkNDEyZDg0ZDM4NmQ5OWQzNTlkMTE0ZDMzMmQxNDRkMzA1ZDE3NGQyNzhkMjA4ZDI2NmQyNDJkMjU0ZDI4NGQyNThkMzEyZDI2MmQzMzVkMjc3ZDM1OGQyOTJkMzgyZDMyMWQ0MDZkMzUwZDQxOWQzODhkNDMyZDQyNmQ0MjhkNDg0ZDQxOGQ1MzhkMzk5ZDU2NGQzODBkNTkwZDM1MmQ2MDZkMzI0ZDYyMmQyOTBkNjM0ZDMxOGQ2NTNkMzM2ZDY2Mi41ZDM1NGQ2NzJkMzcyZDY4N2QzOTBkNzAyZDQxMmQ3MzBkNDI4ZDc1OGQ0MzBkNzg1ZDQzMmQ4MTJkNDMwZDg0MGQ0MjZkODgwZDQwOGQ5MTJkMzkwZDk0NGQzNThkOTc0ZDMyOGQxMDA0ZDMwMGQxMDE1ZDI3MmQxMDI2ZDIzNGQxMDI0aFIyZDUxMlIzZDQzMFI0ZDY2UjVkNzY2UjZkMFI3ZDcwMFI4ZDBSOWQxNDRSMTBpNTFSMTFkNjZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNjNvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxNjNSMTFkMFIxMmQ1MTJSMTNhaGc6NTBvUjBkODgwUjFhZDgwZDkwMGQ5NWQ4MjBkMTQ1ZDc2MGQxOTVkNzAwZDI0NmQ2NjJkMzE2ZDU5NGQzNDNkNTQ2ZDM3MmQ0OTdkMzg1ZDQ1MGQzODdkNDM2ZDM4N2QzNzlkMzQ5ZDMzOS41ZDMxMWQzMDBkMjYyZDMwMGQyMTFkMzAwZDE3NC41ZDMzOS41ZDEzOGQzNzlkMTI3ZDQyNWQxMjFkNDUyZDExOWQ0NjlkMTE3ZDQ4OWQ5OGQ0OTFkOTJkNDkxZDY4ZDQ5MGQ2NWQ0NzNkNjJkNDUzZDY3ZDQxN2Q3OGQzNTVkMTMyZDI5OS41ZDE4NmQyNDRkMjYyZDI0NGQzMzhkMjQ0ZDM5Mi41ZDI5OS41ZDQ0N2QzNTVkNDQ3ZDQzNmQ0NDZkNDUyZDQzNmQ1MDZkMzk0ZDU3NGQzNTJkNjQyZDI4OGQ2OThkMjIxZDc0OGQxODlkNzk1LjVkMTU3ZDg0M2QxNDRkODkyZDEzOGQ5MTVkMTM2ZDkyNC41ZDEzNGQ5MzRkMTMyZDk1NmQ0NDhkOTU2ZDQ2MWQ5NjJkNDYwLjVkOTg0LjVkNDYwZDEwMDdkNDQ4ZDEwMTJkMTA4ZDEwMTJkODhkMTAwNmQ4MGQ5OTVkNzJkOTg0ZDcxZDk2OGQ3MWQ5NDdkNzNkOTM1LjVkNzVkOTI0ZDgwZDkwMGhSMmQ1MTJSM2Q0NjFSNGQ2NVI1ZDc4MFI2ZDEyUjdkNzE1UjhkMFI5ZDE0NFIxMGk1MFIxMWQ2NVIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNoZzoxNjJvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxNjJSMTFkMFIxMmQ1MTJSMTNhaGc6NDlvUjBkODgwUjFhZDIzNGQxMDA4ZDIzNGQ0NDBkMjMyZDQwMWQxODlkNDE5ZDE3NWQ0MjRkMTYzZDQyOGQxNTBkNDI2ZDEzOGQ0MjNkMTMyZDQxMWQxMzBkMzkzZDEzNmQzODBkMTQxZDM2N2QxNTJkMzU0ZDE2MmQzNDNkMjE2ZDI4NGQyMzZkMjcwZDI0OGQyNjRkMjU2ZDI2NGQyNzRkMjY3ZDI3OGQyODRkMjgwZDI5NGQyODBkMzI4ZDI4MGQxMDA4ZDI2OGQxMDIyZDI1NmQxMDIzZDI0NGQxMDI0ZDIzNGQxMDA4aFIyZDUxMlIzZDI4MFI0ZDEzMlI1ZDc2MFI2ZDFSN2Q2MjhSOGQwUjlkMTQ0UjEwaTQ5UjExZDEzMlIxMmQ1MTJSMTNhaTFpM2kyaTJpM2kzaTNpM2kyaTNpM2kzaTNpMmkzaTNoZzoxNjFvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkxNjFSMTFkMFIxMmQ1MTJSMTNhaGc6NDhvUjBkODgwUjFhZDQ4ZDYzMmQ0OGQ0NTNkMTAwLjVkMzU2LjVkMTUzZDI2MGQyNDFkMjYwZDMyOGQyNjBkMzgxLjVkMzU2LjVkNDM1ZDQ1M2Q0MzVkNjMyZDQzNWQ4MTNkMzgxLjVkOTA4ZDMyOGQxMDAzZDI0MWQxMDAzZDE1M2QxMDAzZDEwMC41ZDkwOGQ0OGQ4MTNkNDhkNjMyZDEyNGQ4NjVkODBkODM4ZDM1NGQzOTBkMzk4ZDQxN2QxMjRkODY1ZDEwNWQ2MzZkMTA1ZDc4OWQxNDEuNWQ4NjdkMTc4ZDk0NWQyNDFkOTQ1ZDMwNWQ5NDVkMzQzLjVkODY3ZDM4MmQ3ODlkMzgyZDYzNmQzODJkNDg0ZDM0My41ZDQwMS41ZDMwNWQzMTlkMjQxZDMxOWQxNzhkMzE5ZDE0MS41ZDQwMS41ZDEwNWQ0ODRkMTA1ZDYzNmhSMmQ1MTJSM2Q0MzVSNGQ0OFI1ZDc2NFI2ZDIxUjdkNzE2UjhkMFI5ZDE0NFIxMGk0OFIxMWQ0OFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTFpMmkyaTJpMmkxaTNpM2kzaTNpM2kzaTNpM2hnOjE2MG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTE2MFIxMWQwUjEyZDUxMlIxM2FoZzo0N29SMGQ4ODBSMWFkNzdkMTExNWQ1N2QxMTE3ZDQ4ZDExMDJkNDJkMTA5MmQ0NmQxMDc0ZDEyNmQ4NjBkMjE5ZDYyOGQzMTJkMzk2ZDQwMmQxODBkNDE0ZDE2NGQ0MzJkMTY4ZDQ0NmQxNzJkNDUyZDE4MmQ0NThkMTk2ZDQ1MmQyMDhkMzYyZDQzMGQyNjhkNjYzZDE3NGQ4OTZkMTAyZDEwOThkOTNkMTExM2Q3N2QxMTE1aFIyZDUxMlIzZDQ1MlI0ZDQ2UjVkODU2UjZkLTkxUjdkODEwUjhkMFI5ZDE0NFIxMGk0N1IxMWQ0NlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE1OW9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE1OVIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0Nm9SMGQ4ODBSMWFkMjAwZDkyMGQyMThkOTM4ZDIxOGQxMDA2ZDIwMGQxMDI0ZDEzMmQxMDI0ZDExNGQxMDA2ZDExNGQ5NDBkMTMyZDkyMGQyMDBkOTIwaFIyZDUxMlIzZDIxOFI0ZDExNFI1ZDEwNFI2ZDBSN2QtMTBSOGQwUjlkMTQ0UjEwaTQ2UjExZDExNFIxMmQ1MTJSMTNhaTFpMmkyaTJpMmkyaTJpMmkyaGc6MTU4b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTU4UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ1b1IwZDg4MFIxYWQxMDBkNjk2ZDkwZDY5NGQ4NmQ2ODZkNzZkNjY2ZDg2ZDY0NGQ5MGQ2MzZkMTAyZDYzNGQ0MDBkNjM0ZDQxMmQ2MzRkNDE4ZDY0NGQ0MjZkNjYyZDQyMGQ2ODJkNDE2ZDY5NGQ0MDJkNjk2ZDEwMGQ2OTZoUjJkNTEyUjNkNDIwUjRkODZSNWQzOTBSNmQzMjhSN2QzMDRSOGQwUjlkMTQ0UjEwaTQ1UjExZDg2UjEyZDUxMlIxM2FpMWkzaTNpM2kyaTNpM2kzaTJoZzoxNTdvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxNTdSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDRvUjBkODgwUjFhZDEwMmQxMTQ0ZDgwZDExMjhkMTAyZDExMDBkMTQwZDEwNzhkMTU5ZDEwNjJkMTc4ZDEwNDZkMjEyZDEwMDRkMjIyZDk4OGQxNDhkOTg2ZDEyMGQ5NTRkOTZkOTI4ZDk0ZDg5MmQxMDJkODQ4ZDEzNGQ4MjJkMTY4ZDc5NGQyMjBkNzk0ZDI3MmQ3OTJkMzE2ZDgzMmQzNDhkODcyZDMzNmQ5MjRkMzEyZDk3MmQyNzBkMTAyMGQyMzZkMTA2MGQyMDRkMTA5MmQxNzZkMTExNmQxNjVkMTEyNWQxNTRkMTEzNGQxMzhkMTE0NmQxMTJkMTE1NGQxMDJkMTE0NGhSMmQ1MTJSM2QzMzZSNGQ5NFI1ZDIzMFI2ZC0xMjJSN2QxMzZSOGQwUjlkMTQ0UjEwaTQ0UjExZDk0UjEyZDUxMlIxM2FpMWkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE1Nm9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE1NlIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0M29SMGQ4ODBSMWFkMjQ0ZDkwMmQyMzBkODk0ZDIyOGQ4NzBkMjI2ZDY5OGQ4MGQ2OThkNThkNjk4ZDQ5ZDY4OGQ0MGQ2NzhkNDBkNjY2ZDQwZDY1NGQ1MmQ2NDVkNjRkNjM2ZDg2ZDYzOGQyMjZkNjM4ZDIyMmQ0NjBkMjI2ZDQ0NGQyMzhkNDM4ZDI1MGQ0MzJkMjYyZDQzN2QyNzRkNDQyZDI4MGQ0NjBkMjg0ZDYzNmQ0NDZkNjM2ZDQ2NGQ2NDJkNDY4ZDY1NGQ0NzJkNjY2ZDQ2OWQ2NzhkNDY2ZDY5MGQ0NDZkNjk2ZDI4NGQ2OTZkMjg4ZDg2OGQyODZkODkwZDI3NmQ5MDBkMjYwZDkwOGQyNDRkOTAyaFIyZDUxMlIzZDQ2OVI0ZDQwUjVkNTg3UjZkMTIyUjdkNTQ3UjhkMFI5ZDE0NFIxMGk0M1IxMWQ0MFIxMmQ1MTJSMTNhaTFpM2kyaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkyaTNpM2kzaTJpMmkzaTNoZzoxNTVvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxNTVSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDJvUjBkODgwUjFhZDI0MmQ5NjBkMjMwZDk1MmQyMjRkOTM4ZDIxMGQ4ODBkMjE3ZDgyMGQyMjBkNzgwZDIyNmQ3MDhkMTc4ZDc1NGQxMzlkNzg0ZDk2ZDgyMmQ3NGQ4MjhkNDZkODMyZDQyZDgwOGQ0MGQ4MDBkNDRkNzkwZDc4ZDc1NmQxMTlkNzI5ZDE2MmQ3MDJkMjE4ZDY3MmQxNTZkNjM2ZDExNmQ2MDJkODRkNTc2ZDUyZDU0OGQ0MmQ1MzhkNDZkNTIyZDUwZDUwNmQ2NmQ1MDJkNzRkNTAwZDg2ZDUwMmQxMTZkNTI4ZDE0M2Q1NTFkMTgyZDU4MGQyMzBkNjM2ZDIyNGQ1NTJkMjE4ZDUwMGQyMTFkNDM2ZDIyNGQzOTJkMjM0ZDM2MGQyNTZkMzU4ZDI3NGQzNTlkMjgwZDM4MGQyODZkMzk4ZDI4NmQ0MjQuNWQyODZkNDUxZDI4MmQ0OTlkMjc2ZDU2M2QyNjhkNjQyZDMzNmQ1OTBkMzYxZDU3M2Q0MDJkNTQ2ZDQxOGQ1MzdkNDM0ZDUyOGQ0NTRkNTI2ZDQ3MmQ1MzRkNDc0ZDU1MGQ0NzZkNTU4ZDQ3NGQ1NjZkNDY0ZDU4MGQ0NDhkNTkwZDQzMmQ2MDBkNDE3ZDYwOWQ0MDJkNjE4ZDM4M2Q2MjlkMzYyZDY0MmQyODZkNjcwZDM2MmQ3MDRkMzg4ZDcyNGQ0MjhkNzUyZDQ3MGQ3ODJkNDgwZDc5MGQ0NzZkODA4ZDQ3MmQ4MjRkNDU2ZDgyOGQ0NDZkODMyZDQzMGQ4MjhkMzg4ZDc5NmQzNDhkNzY3ZDMxOGQ3NDZkMjY2ZDY5NmQyNzRkNzc4ZDI3N2Q4MjJkMjgyZDg2NmQyODRkODg3ZDI4NmQ5MDhkMjg2ZDkzNGQyODRkOTUyZDI2NGQ5NjBkMjUyZDk2MmQyNDJkOTYwaFIyZDUxMlIzZDQ3NlI0ZDQyUjVkNjY2UjZkNjRSN2Q2MjRSOGQwUjlkMTQ0UjEwaTQyUjExZDQyUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoxNTRvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxNTRSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDFvUjBkODgwUjFhZDEwMmQxMTAyZDc2ZDEwOTJkODJkMTA2NmQxNjJkOTcwZDIxMGQ4NThkMjU4ZDc0NmQyNTBkNjIwZDI0NGQ1MDBkMTg2ZDQwNmQxMjhkMzEyZDY2ZDIyNmQ2NmQyMTJkODZkMjA2ZDEwMGQyMDJkMTIyZDIxNGQxNTBkMjQyZDE4MWQyODlkMjEyZDMzNmQyNDVkMzk3ZDI3OGQ0NThkMjkyZDUyM2QzMDZkNTg4ZDMwOGQ2MjZkMzA2ZDgwMmQyNTVkOTA2ZDIwNGQxMDEwZDEyOGQxMDk2ZDExOGQxMTA0ZDEwMmQxMTAyaFIyZDUxMlIzZDMwOFI0ZDY2UjVkODE4UjZkLTc4UjdkNzUyUjhkMFI5ZDE0NFIxMGk0MVIxMWQ2NlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTUzb1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTUzUjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQwb1IwZDg4MFIxYWQ0MzJkMTEyOGQ0MDhkMTEyNmQzOTJkMTExMGQzNjhkMTA5MGQzMjdkMTA0OWQyODZkMTAwOGQyNjBkOTQ5ZDIzNGQ4OTBkMjIwZDgzMmQyMDZkNzc0ZDIwNmQ2NjhkMjA0ZDU0NGQyNTVkNDI1ZDMwNmQzMDZkNDAwZDIwOGQ0MjBkMTk0ZDQ0MmQxOTRkNDY4ZDIwNGQ0NjJkMjMwZDQxOGQyNzJkMzgwZDMxOWQzNDJkMzY2ZDMwNWQ0NTFkMjY4ZDUzNmQyNjRkNjY0ZDI2OGQ4MzhkMzEwZDkxNmQzNTJkOTk0ZDM5M2QxMDM0ZDQzNGQxMDc0ZDQ1NmQxMDg2ZDQ3NmQxMDk4ZDQ2NGQxMTIwZDQ1MGQxMTI4ZDQzMmQxMTI4aFIyZDUxMlIzZDQ2NFI0ZDIwNlI1ZDgzMFI2ZC0xMDRSN2Q2MjRSOGQwUjlkMTQ0UjEwaTQwUjExZDIwNlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTUyb1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTUyUjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM5b1IwZDg4MFIxYWQxNjVkNTAxZDE0OWQ0OTlkMTQ5ZDQ4M2QxNDhkNDcxZDE1NWQ0NTlkMTU3ZDQ0OGQxODBkMzY4ZDE3MWQzNjlkMTYxZDM2N2QxNDhkMzY0ZDEzNGQzNTRkMTA1ZDMzM2QxMDFkMjg3ZDk4ZDI0N2QxMjFkMjIwZDE0NmQxOTFkMTc1ZDE5MGQxOTlkMTg1ZDIyNWQxOTQuNWQyNTFkMjA0ZDI2M2QyMjBkMjcxZDIzNGQyNzMuNWQyNDdkMjc2ZDI2MGQyNzZkMjg1ZDI3NmQzMDVkMjczZDMyN2QyNjlkMzUwZDI0NGQzOTdkMjE0ZDQ1MmQyMDJkNDcyLjVkMTkwZDQ5M2QxODFkNDk5ZDE3M2Q1MDJkMTY1ZDUwMWhSMmQ1MTJSM2QyNzZSNGQxMDFSNWQ4MzRSNmQ1MjNSN2Q3MzNSOGQwUjlkMTQ0UjEwaTM5UjExZDEwMVIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTUxb1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTUxUjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM4b1IwZDg4MFIxYWQxNTFkMTAyM2QxMjhkMTAxNmQxMDVkMTAwNmQ4MmQ5OTZkNjZkOTc3ZDQ2ZDk1MGQ0Mi41ZDkxOWQzOWQ4ODhkNDNkODU1ZDU2ZDc4NmQ5MmQ3MjhkMTI4ZDY3MGQxNjhkNjExZDEzOGQ1NjJkMTE3ZDUwOWQ5NmQ0NTZkOTJkMzk3ZDkyZDM2N2QxMDAuNWQzNDIuNWQxMDlkMzE4ZDEyOWQyOTRkMTQ1ZDI3OGQxNjVkMjcwZDE4NWQyNjJkMjE0ZDI2MmQyNDBkMjY1ZDI2MS41ZDI3NWQyODNkMjg1ZDMwM2QzMDVkMzE5ZDMyNWQzMjUuNWQzNTFkMzMyZDM3N2QzMzJkNDA0ZDMyM2Q0NjNkMjk3LjVkNTE1LjVkMjcyZDU2OGQyNDRkNjI0ZDI3MGQ2NzRkMjk3LjVkNzI1ZDMyNWQ3NzZkMzU4ZDgxOGQzOTFkNzcxZDQxN2Q3MTRkNDI4ZDcxNGQ0NjZkNzEzZDQ2OWQ3MzVkNDY5ZDc0NGQ0MzVkODEyZDM5MWQ4NzRkNDYxZDk4MGQ0NTNkMTAxNGQ0MTRkMTAxMWQ0MDhkMTAxMWQzNTBkOTI0ZDM0N2Q5MjRkMzM5ZDkzNGQzMDBkOTczZDI1My41ZDk5OS41ZDIwN2QxMDI2ZDE1MWQxMDIzZDIzNGQ5MzdkMjcyZDkxNWQzMDZkODc0ZDMxMmQ4NjlkMzA2ZDg2MWQyNzdkODE4ZDI0OC41ZDc3MmQyMjBkNzI2ZDE5N2Q2ODdkMTU4ZDczNmQxMzBkNzkwLjVkMTAyZDg0NWQxMDVkOTE0ZDEyMmQ5NDRkMTM1ZDk1M2QxNTBkOTU2LjVkMTY1ZDk2MGQxODFkOTYwZDIzNGQ5MzdkMjExZDU0NWQyMzhkNTAyZDI1NGQ0NjFkMjcwZDQyMGQyNjdkMzcxZDI1MGQzNDFkMjQwZDMzMWQyMjUuNWQzMjhkMjExZDMyNWQxOTRkMzI4ZDE3MmQzMzhkMTYyZDM2MGQxNTBkMzk1ZDE1OGQ0MzdkMTY1ZDQ2NmQxNzhkNDk0ZDE5MWQ1MjJkMjA3ZDU0OWQyMTFkNTQ1aFIyZDUxMlIzZDQ2OVI0ZDQyUjVkNzYyUjZkMVI3ZDcyMFI4ZDBSOWQxNDRSMTBpMzhSMTFkNDJSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kyaTNpMmkzaTJpMmkyaTJpM2kzaTFpM2kyaTJpM2kzaTNpM2kyaTNpM2kyaTFpM2kzaTJpM2kzaTNpM2kzaTNpMmhnOjE1MG9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE1MFIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozN29SMGQ4ODBSMWFkODZkMTA0OGQ2OGQxMDM0ZDcyZDEwMTBkOThkOTA2ZDEzM2Q4MDBkMTY4ZDY5NGQyMTRkNTkyZDE4MmQ2MTZkMTY2ZDYyMWQxNTBkNjI2ZDEyMmQ2MjJkOThkNjE0ZDcwZDU4NGQ0MmQ1NTBkMzFkNTA3ZDIwZDQ2NGQyNmQzOTRkNDBkMzEwZDgwZDI3NmQxMjJkMjM2ZDE4NmQyMzhkMjI4ZDI0NmQyNDRkMjcwZDI2OGQzMDJkMjc1ZDM0MWQyODJkMzgwZDI3NGQ0NTBkMzA4ZDM2OGQzMzBkMzE2ZDM1MmQyNjRkMzc0ZDIxMGQzODhkMjAwZDQwMGQyMDRkNDE4ZDIxMGQ0MjBkMjI0ZDQyMGQyNDRkMzQyZDQ0MmQyNTlkNjQwZDE3NmQ4MzhkMTI4ZDEwMzJkMTEwZDEwNThkODZkMTA0OGQzNDBkMTA1MGQzMDhkMTA0NmQyODJkMTAyNGQyNTZkOTkyZDI0M2Q5NThkMjMwZDkyNGQyMzBkODcyZDIzNGQ4MDRkMjQyZDc3MWQyNTBkNzM4ZDI4MmQ2OTZkMzAyZDY3OGQzMjZkNjY4ZDM1MGQ2NThkMzgwZDY2MmQ0MjhkNjcyZDQ1NGQ3MTBkNDc4ZDc0MmQ0ODFkNzc2ZDQ4NGQ4MTBkNDg0ZDg1NGQ0ODJkOTAwZDQ2N2Q5NTBkNDUyZDEwMDBkNDIwZDEwMjJkNDAwZDEwNDBkMzg2ZDEwNDVkMzcyZDEwNTBkMzQwZDEwNTBkMzY2ZDk4OGQzOTJkOTc2ZDQwNGQ5NjBkNDE2ZDk0NGQ0MjZkOTEwZDQzNGQ4NThkNDMyZDgwOGQ0MzBkNzgwZDQyNGQ3NjZkNDE4ZDc1MmQ0MDBkNzM4ZDM4NGQ3MThkMzUyZDcyMGQzMjJkNzI2ZDMwNGQ3NThkMjk0ZDc5NmQyOTBkODI1ZDI4NmQ4NTRkMjg4ZDg5OGQyOTRkOTU0ZDMyMmQ5ODBkMzQ2ZDk5NGQzNjZkOTg4ZDE3OGQ1NTJkMTk2ZDUzOGQyMDhkNTE2ZDIyNGQ0NzhkMjI2ZDQ0N2QyMjhkNDE2ZDIyMmQzNjhkMjEyZDMyMGQxOTdkMzA4ZDE4MmQyOTZkMTY0ZDI5NmQxMzRkMzAwZDExMGQzMjhkNzhkMzcwZDgwZDQzNGQ3NGQ1MThkMTM2ZDU2MGQxNjBkNTYwZDE3OGQ1NTJoUjJkNTEyUjNkNDg0UjRkMjZSNWQ4MjBSNmQtMjZSN2Q3OTRSOGQwUjlkMTQ0UjEwaTM3UjExZDI2UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaGc6MTQ5b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTQ5UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM2b1IwZDg4MFIxYWQyNDFkMTE0MmQyMzVkMTE0MGQyMjlkMTEzNGQyMjNkMTEyOGQyMjFkMTEyMmQyMTlkMTExMGQyMTguNWQxMDkwLjVkMjE4ZDEwNzFkMjE4ZDEwNTdkMjE4ZDEwMjRkMTk4ZDEwMjFkMTcyLjVkMTAwOWQxNDdkOTk3ZDEyMGQ5NjhkOTJkOTM4ZDc5ZDkwMWQ2NmQ4NjRkNjJkODIyZDY2ZDgwMGQ5MmQ4MDBkMTEwZDgwMGQxMThkODIwZDEyMmQ4NjBkMTM0ZDg4N2QxNDZkOTE0ZDE2OGQ5MzdkMTkwZDk2MGQyMThkOTY3ZDIxOGQ5MjJkMjI4ZDkwNWQyNDcuNWQ5MDUuNWQyNjdkOTA2ZDI3NmQ5MjNkMjc2ZDk2OWQyODhkOTY5ZDMxMGQ5NTVkMzMwZDk0MmQzNDBkOTI4ZDM1MGQ5MTRkMzU5ZDg4OWQzNjhkODY0ZDM3MGQ4MzJkMzY4ZDc5MGQzNTFkNzYwZDMzNGQ3MzBkMzE1ZDcxMWQyOTZkNjkyZDI4NGQ2ODNkMjcyZDY3NGQyNThkNjY4ZDIzMmQ2NTVkMjAyZDY0MmQxNzhkNjMwZDE1N2Q2MTZkMTM2ZDYwMmQxMTRkNTc2ZDgyZDU0MGQ2OGQ1MDZkNTRkNDcyZDU2ZDQxOGQ1OGQzOThkNjZkMzc5ZDc0ZDM2MGQ5MmQzNDRkMTI0ZDMxOGQxNTRkMzEwZDE4NGQzMDJkMjE4ZDMwMGQyMThkMjQzZDIxOGQyMzdkMjE4ZDIyNy41ZDIxOGQyMThkMjIwZDE5MGQyMjlkMTc2ZDI0MmQxNjZkMjU2ZDE3MGQyNzBkMTcyZDI3NmQxODhkMjc4ZDIwMmQyNzdkMjEzZDI3N2QyMjBkMjc2LjVkMjMyLjVkMjc2ZDI0NWQyNzZkMjUzZDI3NmQzMDBkMzE0ZDMwMGQzNDdkMzE2ZDM4MGQzMzJkNDAyZDM1OWQ0MjRkMzg2ZDQzNmQ0MDhkNDQ4ZDQzMGQ0NTBkNDYwZDQ0NGQ0NzZkNDMwZDQ4MGQ0MjJkNDgyZDQxNGQ0ODBkNDAwZDQ3NmQzOTZkNDYwZDM4OGQ0MzhkMzc1ZDQxOGQzNjJkMzk4ZDM0NWQzODRkMzI4ZDM3MGQzMTBkMzY0ZDI5MmQzNThkMjc2ZDM1OGQyNzZkNDA0ZDI2OWQ0MjJkMjQ2LjVkNDIyZDIyNGQ0MjJkMjE4ZDQwM2QyMThkMzYwZDE4NmQzNjJkMTcxZDM2NWQxNTZkMzY4ZDEzNGQzODRkMTIwZDQwMGQxMTZkNDE3ZDExMmQ0MzRkMTE2ZDQ2MmQxMjJkNDk4ZDE0NWQ1MjlkMTY4ZDU2MGQyMDZkNTgwZDIzNWQ1OTRkMjYyZDYwMmQzMDhkNjIyZDM0OGQ2NjBkMzg4ZDY5OGQ0MDZkNzQ2ZDQxNmQ3NzBkNDIxZDc5M2Q0MjZkODE2ZDQyNmQ4NTBkNDIyZDg4OGQ0MDZkOTIyZDM5MGQ5NTZkMzYwZDk4NmQzMzhkMTAwNmQzMTFkMTAxNmQyODRkMTAyNmQyNzZkMTAyNGQyNzZkMTA1N2QyNzZkMTA2OGQyNzYuNWQxMDg0ZDI3N2QxMTAwZDI3N2QxMTEzZDI3N2QxMTI2ZDI2N2QxMTM2ZDI2MWQxMTQwZDI1NWQxMTQxZDI0OWQxMTQyZDI0MWQxMTQyaFIyZDUxMlIzZDQ1MFI0ZDU2UjVkODU0UjZkLTExOFI3ZDc5OFI4ZDBSOWQxNDRSMTBpMzZSMTFkNTZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaGc6MTQ4b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTQ4UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM1b1IwZDg4MFIxYWQxMjhkMTA1NmQxMTRkMTA1MmQxMDZkMTAzNmQxMDJkMTAyMGQxMDRkOTk2ZDEwOGQ5NjBkMTA5ZDkzMmQxMTBkOTA0ZDExMGQ4NTBkODhkODUwZDUyZDg1MGQzNGQ4NTJkMjVkODQwZDE2ZDgyOGQxOWQ4MTRkMjJkODAwZDM4ZDc5NGQ1NmQ3OTRkMTEwZDc5MmQxMTRkNzI2ZDExNWQ2NDVkMTE2ZDU2NGQxMThkNDkyZDExMGQ0OTJkOTJkNDk0ZDgyZDQ5OGQ3MmQ1MDJkNThkNTAyZDQ0ZDQ5OGQzNWQ0ODdkMjZkNDc2ZDMxZDQ2M2QzNmQ0NTBkNTBkNDQ0ZDc0ZDQ0NGQ4NmQ0NDBkOThkNDM2ZDEyMmQ0MzRkMTI0ZDM4NmQxMjhkMzI4ZDEzN2QyNzRkMTQ0ZDI0NmQxNTJkMjM0ZDE2NmQyMzRkMTc5ZDIzNWQyMDBkMjUwZDE5NGQyODFkMTg4ZDMxMmQxODRkMzUzZDE4MGQzOTRkMTgwZDQzNGQzMDZkNDMyZDMxMGQzODhkMzE1ZDM0MGQzMjBkMjkyZDMzNmQyNDZkMzQ4ZDIzNmQzNjRkMjQwZDM4MGQyNDZkMzg0ZDI2MGQzODZkMjY4ZDM4NGQyNzZkMzc2ZDMxNmQzNzFkMzU1ZDM2NmQzOTRkMzY0ZDQzMGQzOTBkNDMyZDQwOGQ0MzVkNDI2ZDQzOGQ0NDBkNDQ4ZDQ0OGQ0NjBkNDQ2ZDQ3NGQ0NDRkNDg4ZDQyNmQ0OTRkNDA2ZDQ5NGQzOTZkNDkwZDM4NWQ0ODlkMzc0ZDQ4OGQzNjJkNDg4ZDM1NmQ1NzZkMzU2ZDY1MWQzNTZkNzI2ZDM1NmQ3NzhkMzgwZDc3OGQ0MjRkNzcyZDQ0MGQ3NzZkNDQ0ZDc5MmQ0NDZkODAwZDQ0NGQ4MDhkNDQwZDgyNGQ0MjRkODI4ZDM1NGQ4MzZkMzU0ZDg4OGQzNTRkOTE3ZDM1NGQ5NDZkMzU1ZDk3MGQzNTZkOTk0ZDM2MGQxMDM0ZDM1NGQxMDUwZDM0MGQxMDU0ZDMzMGQxMDU2ZDMyMmQxMDU0ZDMwOGQxMDUwZDMwMmQxMDM0ZDI5OGQxMDAyZDI5N2Q5NzBkMjk2ZDkzOGQyOTZkOTA0ZDI5NmQ4NDBkMjYyZDg0NGQyMjdkODQ1ZDE5MmQ4NDZkMTcwZDg0OGQxNjhkOTA2ZDE2OGQ5MzNkMTY4ZDk2MGQxNjRkMTAwMGQxNjhkMTAwNmQxNzFkMTAxM2QxNzRkMTAyMGQxNzJkMTAzMGQxNjZkMTA1MmQxNDRkMTA1NmQxMzZkMTA1OGQxMjhkMTA1NmQyOThkNzgyZDI5OGQ3NzZkMjk4ZDc1MGQyOThkNzI0ZDI5OGQ2NTBkMjk4ZDU3NmQzMDRkNDkwZDE3NmQ0OTJkMTc2ZDU2NmQxNzRkNjQ4ZDE3MmQ3MzBkMTcwZDc5MGQyMjRkNzg4ZDI5OGQ3ODJoUjJkNTEyUjNkNDQ2UjRkMTlSNWQ3OTBSNmQtMzJSN2Q3NzFSOGQwUjlkMTQ0UjEwaTM1UjExZDE5UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpMmkyaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kyaTJpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kyaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpMWkzaTNpM2kyaTNpM2kyaTJoZzoxNDdvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxNDdSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzRvUjBkODgwUjFhZDI2OGQ0MzJkMjU2ZDQzMmQyNTRkNDIyZDI0OGQ0MTRkMjU2ZDM5NGQyODhkMzM4ZDMwM2QyNzlkMzE4ZDIyMGQzNDJkMjAyZDM3OGQxODRkNDA0ZDE5OGQ0MjBkMjA2ZDQyOGQyMTZkNDQwZDIzNGQ0MjZkMjY2ZDQwNmQzMDJkMzcwZDM0MWQzMzRkMzgwZDI4NmQ0MjZkMjgwZDQzMmQyNjhkNDMyZDg4ZDQxOGQ3NmQ0MTZkNzZkNDEwZDcyZDM5OGQ3OGQzODBkMTA4ZDMyOGQxMjNkMjc1ZDEzOGQyMjJkMTY4ZDIwMGQxOTJkMTgyZDIyOGQxOTRkMjQyZDIwNGQyNDhkMjIwZDI1MmQyMzJkMjQwZDI1NmQyMTRkMjkwZDE3OGQzMzRkMTQyZDM3OGQxMDZkNDE0ZDk2ZDQyMmQ4OGQ0MThoUjJkNTEyUjNkNDI4UjRkNzZSNWQ4MzBSNmQ1OTJSN2Q3NTRSOGQwUjlkMTQ0UjEwaTM0UjExZDc2UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjE0Nm9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE0NlIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozM29SMGQ4ODBSMWFkMjUyZDEwODhkMjIyZDEwODhkMjAwZDEwNzdkMTc4ZDEwNjZkMTYyZDEwNDZkMTQwZDEwMThkMTQ2ZDk4MmQxNTRkOTUwZDE4MmQ5MzBkMjA4ZDkxMGQyNjJkOTE0ZDMwMmQ5MjJkMzIwZDk0NmQzMzZkOTY2ZDM0MWQ5ODRkMzQ2ZDEwMDJkMzQyZDEwMjZkMzM4ZDEwNDhkMzIwZDEwNjRkMzA2ZDEwNzZkMjkwZDEwODJkMjc0ZDEwODhkMjUyZDEwODhkMjQ4ZDcyOGQyMzJkNzI0ZDIyOGQ3MDhkMjI0ZDY3MmQyMjFkNjQ1ZDIxOGQ2MThkMjIwZDU3MGQyMjZkMzY2ZDIzMGQzMDhkMjI2ZDI3MGQyMjZkMjQ2ZDIyOGQyMzJkMjM4ZDIyNGQyNTBkMjE2ZDI2NGQyMThkMjc4ZDIyMGQyODRkMjM4ZDI4NGQyNzBkMjg4ZDMwNmQyODRkMzY2ZDI3MmQ2MThkMjc4ZDY0NGQyODRkNzA4ZDI4MGQ3MjRkMjY0ZDcyOGQyNTZkNzMwZDI0OGQ3MjhoUjJkNTEyUjNkMzQyUjRkMTQ2UjVkODA2UjZkLTY0UjdkNjYwUjhkMFI5ZDE0NFIxMGkzM1IxMWQxNDZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTJpM2kyaTNpM2kzaTJpM2kzaTJpM2kzaGc6MTQ1b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTQ1UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjMyb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMzJSMTFkMFIxMmQ1MTJSMTNhaGc6MTQ0b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTQ0UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0M29SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE0M1IxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTVvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyNTVSMTFkMFIxMmQ1MTJSMTNhaGc6MTQyb1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTQyUjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTI1NFIxMWQwUjEyZDUxMlIxM2FoZzoxNDFvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxNDFSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUzb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjUzUjExZDBSMTJkNTEyUjEzYWhnOjE0MG9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTE0MFIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTJvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyNTJSMTFkMFIxMmQ1MTJSMTNhaGc6MTM5b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTM5UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1MW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTI1MVIxMWQwUjEyZDUxMlIxM2FoZzoxMzhvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxMzhSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUwb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjUwUjExZDBSMTJkNTEyUjEzYWhnOjEzN29SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTEzN1IxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDlvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyNDlSMTFkMFIxMmQ1MTJSMTNhaGc6MTM2b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTM2UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0OG9SMGQ4ODBSMWFkMTAxZDEwODlkNTdkMTA2MWQ0MTlkNDY2ZDQ2M2Q0OTRkMTAxZDEwODlkMjYyZDEwMjJkMjI2ZDEwMjJkMTk4ZDEwMTBkMTcwZDk5OGQxMzZkOTYxZDEwMmQ5MjRkOTJkODc2ZDgyZDgyOGQ4NGQ3NTBkODZkNjcyZDk4ZDYzNmQxMTBkNjAwZDE0NGQ1NjJkMTU4ZDU1MGQxNzJkNTQyZDE4NmQ1MzRkMjIyZDUyNmQyNjBkNTE4ZDI5NGQ1MjRkMzI2ZDUzMGQzNDlkNTQyZDM3MmQ1NTRkMzk0ZDU3NmQ0MTRkNTk2ZDQyNmQ2MjhkNDQ2ZDY3OGQ0NDlkNzI2ZDQ1MmQ3NzRkNDQ3ZDgxOGQ0NDJkODYyZDQyMWQ5MDZkNDAwZDk1MGQzNzBkOTc4ZDM0MGQxMDA2ZDMxNWQxMDE0ZDI5MGQxMDIyZDI2MmQxMDIyZDM0MGQ5MjRkMzY0ZDg5NmQzODBkODU1ZDM5NmQ4MTRkMzk1ZDc2NGQzOTRkNzE0ZDM4OGQ2ODdkMzgyZDY2MGQzNjZkNjMwZDMyM2Q1ODBkMjcwZDU3NmQyNDRkNTc1ZDIyMGQ1ODAuNWQxOTZkNTg2ZDE3OGQ2MDJkMTU2ZDYyNGQxNDdkNjYyZDEzOGQ3MDBkMTM5ZDc2OGQxNDBkODM2ZDE1MmQ4NjhkMTY0ZDkwMGQyMDRkOTM0ZDIyMGQ5NDRkMjM3ZDk0OWQyNTRkOTU0ZDI4MWQ5NTJkMzA4ZDk1MGQzNDBkOTI0aFIyZDUxMlIzZDQ2M1I0ZDU3UjVkNTU4UjZkLTY1UjdkNTAxUjhkMFI5ZDE0NFIxMGkyNDhSMTFkNTdSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjEzNW9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTEzNVIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDdvUjBkODgwUjFhZDE3MmQ2OTRkMTM0ZDY4MGQxMjhkNjcyZDEyNWQ2NjJkMTIyZDY1MmQxMjRkNjQ2ZDEzNGQ2MjZkMTUyZDYxNGQxNzZkNjE2ZDIwMGQ2MThkMjIyZDYxNmQ4NjZkNjI0ZDg4NmQ2MzRkODkyZDY0MmQ4OTVkNjU0ZDg5OGQ2NjZkODk2ZDY3NmQ4ODZkNjk2ZDg2NmQ3MTBkMTcyZDY5NGQ0MjRkNDEyZDQyNGQzNzhkNDQ5ZDM1M2Q0NzRkMzI4ZDUxMmQzMjhkNTQ4ZDMyOGQ1NzRkMzUzZDYwMGQzNzhkNjAwZDQxMmQ2MDBkNDQ4ZDU3NGQ0NzJkNTQ4ZDQ5NmQ1MTJkNDk2ZDQ3NGQ0OTZkNDQ5ZDQ3MmQ0MjRkNDQ4ZDQyNGQ0MTJkNDI0ZDkwMGQ0MjRkODY2ZDQ1MWQ4NDFkNDc4ZDgxNmQ1MTZkODE2ZDU1MmQ4MTZkNTgwZDg0MWQ2MDhkODY2ZDYwOGQ5MDBkNjA4ZDkzNmQ1ODBkOTYwZDU1MmQ5ODRkNTE2ZDk4NGQ0NzhkOTg0ZDQ1MWQ5NjBkNDI0ZDkzNmQ0MjRkOTAwaFIyZDEwMjRSM2Q4OTZSNGQxMjRSNWQ2OTZSNmQ0MFI3ZDU3MlI4ZDBSOWQxNDRSMTBpMjQ3UjExZDEyNFIxMmQxMDI0UjEzYWkxaTJpM2kzaTJpM2kzaTJpMmkzaTNpMmkzaTFpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kzaTNpM2kzaGc6MTM0b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTM0UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0Nm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTI0NlIxMWQwUjEyZDUxMlIxM2FoZzoxMzNvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxMzNSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ1b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjQ1UjExZDBSMTJkNTEyUjEzYWhnOjEzMm9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTEzMlIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDRvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyNDRSMTFkMFIxMmQ1MTJSMTNhaGc6MTMxb1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTMxUjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0M29SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTI0M1IxMWQwUjEyZDUxMlIxM2FoZzoxMzBvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxMzBSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQyb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjQyUjExZDBSMTJkNTEyUjEzYWhnOjEyOW9SMGQ4ODBSMWFkMzRkMTAyNGQzNGQzNDJkMzA2ZDM0MmQzMDZkMTAyNGQzNGQxMDI0ZDY4ZDk5MGQyNzJkOTkwZDI3MmQzNzZkNjhkMzc2ZDY4ZDk5MGhSMmQzNzRSM2QzMDZSNGQzNFI1ZDY4MlI2ZDBSN2Q2NDhSOGQwUjlkMTQ0UjEwaTEyOVIxMWQzNFIxMmQzNzRSMTNhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDFvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyNDFSMTFkMFIxMmQ1MTJSMTNhaGc6MTI4b1IwZDg4MFIxYWQzNGQxMDI0ZDM0ZDM0MmQzMDZkMzQyZDMwNmQxMDI0ZDM0ZDEwMjRkNjhkOTkwZDI3MmQ5OTBkMjcyZDM3NmQ2OGQzNzZkNjhkOTkwaFIyZDM3NFIzZDMwNlI0ZDM0UjVkNjgyUjZkMFI3ZDY0OFI4ZDBSOWQxNDRSMTBpMTI4UjExZDM0UjEyZDM3NFIxM2FpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTI0MFIxMWQwUjEyZDUxMlIxM2FoZzoxMjdvUjBkODgwUjFhZDM0ZDEwMjRkMzRkMzQyZDMwNmQzNDJkMzA2ZDEwMjRkMzRkMTAyNGQ2OGQ5OTBkMjcyZDk5MGQyNzJkMzc2ZDY4ZDM3NmQ2OGQ5OTBoUjJkMzc0UjNkMzA2UjRkMzRSNWQ2ODJSNmQwUjdkNjQ4UjhkMFI5ZDE0NFIxMGkxMjdSMTFkMzRSMTJkMzc0UjEzYWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjM5b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjM5UjExZDBSMTJkNTEyUjEzYWhnOjEyNm9SMGQ4ODBSMWFkMzI4ZDQwNGQyOTRkMzk2ZDI3NWQzNzZkMjU2ZDM1NmQyMzhkMzI2ZDIyMGQyOTZkMTk2ZDI4N2QxNzJkMjc4ZDE0OGQyODVkMTI0ZDI5MmQxMTFkMzExZDk4ZDMzMGQ5NmQzNDRkOTRkMzU4ZDgzZDM2NmQ3MmQzNzRkNTdkMzcyZDQyZDM3MGQzOGQzNTRkMzhkMzA2ZDY5ZDI3NGQxMDBkMjQyZDEzMGQyMzBkMTYwZDIxOGQxODlkMjI0ZDIxOGQyMzBkMjM1ZDI0MWQyNTJkMjUyZDI2NmQyNjlkMjgwZDI4NmQyOTJkMzA0ZDMwNGQzMjJkMzE4ZDMzN2QzMzJkMzUyZDM0OGQzNDlkMzY0ZDM0NmQzNzNkMzQxZDM4MmQzMzZkMzk1ZDMyM2Q0MDhkMzEwZDQxMGQyODJkNDEyZDI1NGQ0MjJkMjMyZDQzNmQyMThkNDUxZDIyMmQ0NjZkMjI2ZDQ3MmQyNDRkNDcyZDMwMGQ0NTVkMzMyZDQzOGQzNjRkNDE2ZDM4MWQzOTRkMzk4ZDM4MGQ0MDFkMzY2ZDQwNGQzMjhkNDA0aFIyZDUxMlIzZDQ3MlI0ZDM4UjVkODAyUjZkNjIwUjdkNzY0UjhkMFI5ZDE0NFIxMGkxMjZSMTFkMzhSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM4b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjM4UjExZDBSMTJkNTEyUjEzYWhnOjEyNW9SMGQ4ODBSMWFkMTAyZDExMjZkNzhkMTEyMGQ3M2QxMTA2ZDY4ZDEwOTJkNzBkMTA4NGQ3MmQxMDc2ZDgwZDEwNzBkODhkMTA2NGQxMDZkMTA2MmQxMTJkMTA2NmQxMjAuNWQxMDY0ZDEyOWQxMDYyZDEzOS41ZDEwNTNkMTUwZDEwNDRkMTU4ZDEwMzJkMTgyZDEwMTZkMTk2ZDk5MWQyMTBkOTY2ZDIxOGQ5MThkMjE0ZDg3MGQxOTlkODQ0LjVkMTg0ZDgxOWQxNjVkNzk5LjVkMTQ2ZDc4MGQxMzhkNzM4ZDE0MmQ3MDBkMTYwZDY3NGQxNzhkNjQ4ZDE5MGQ2MzZkMTYwZDYwOGQxNDlkNTc3ZDEzOGQ1NDZkMTQ2ZDQ5OGQxNjRkNDcwZDE4MWQ0NDguNWQxOThkNDI3ZDIxNGQzOTBkMjI0ZDM0MmQyMTFkMzE3ZDE5OGQyOTJkMTkzZDI4MGQxODhkMjY4ZDE3MGQyNTZkMTUyZDI0NGQxMzRkMjQyZDEwMmQyMzZkODZkMjI0ZDc4ZDIxNGQ3N2QyMDhkNzZkMjAyZDc3ZDE5NWQ3OGQxODhkODRkMTgyZDkwZDE3NmQxMTRkMTc0ZDE0NmQxODJkMTc0ZDE5NmQyMDZkMjA4ZDIyNmQyMzJkMjQ2ZDI1NmQyNTZkMjgxZDI2NmQzMDZkMjcyZDM1MmQyNzJkNDA4ZDIzNGQ0NTJkMTk2ZDQ5NmQxOTNkNTI0ZDE5MGQ1NTJkMjAzZDU2OGQyMTZkNTg0ZDIyM2Q1OTBkMjMwZDU5NmQyNDJkNjAwZDI1NGQ2MDRkMzI4ZDYwMmQzMzlkNjA0ZDM0NmQ2MDkuNWQzNTNkNjE1ZDM1NWQ2MjdkMzU0ZDY0MWQzNDZkNjQ4LjVkMzM4ZDY1NmQzMjhkNjU4ZDI5MGQ2NThkMjY5ZDY2MGQyNDhkNjYyZDIyNWQ2NzhkMjAyZDY5NGQxOTNkNzE5ZDE4NGQ3NDRkMjEwZDc3NmQyMzZkODA4ZDI1OWQ4NjBkMjgyZDkxMmQyNjRkOTY0ZDI1MmQxMDA2ZDIzM2QxMDM0ZDIxNGQxMDYyZDE5MmQxMDg0ZDE2OGQxMTA2ZDE0NWQxMTE1ZDEyMmQxMTI0ZDEwMmQxMTI2aFIyZDUxMlIzZDM1NVI0ZDcwUjVkODUwUjZkLTEwMlI3ZDc4MFI4ZDBSOWQxNDRSMTBpMTI1UjExZDcwUjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIzN29SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIzN1IxMWQwUjEyZDUxMlIxM2FoZzoxMjRvUjBkODgwUjFhZDIxNmQ1NjhkMjE2ZDE0NGQyNzJkMTQ0ZDI3MmQ1NjhkMjQ1ZDU4OGQyMTZkNTY4ZDIxNmQxMTY0ZDIxNmQ3NDBkMjQ1ZDcyMGQyNzJkNzQwZDI3MmQxMTY0ZDIxNmQxMTY0aFIyZDUxMlIzZDI3MlI0ZDIxNlI1ZDg4MFI2ZC0xNDBSN2Q2NjRSOGQwUjlkMTQ0UjEwaTEyNFIxMWQyMTZSMTJkNTEyUjEzYWkxaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmhnOjIzNm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIzNlIxMWQwUjEyZDUxMlIxM2FoZzoxMjNvUjBkODgwUjFhZDM5NmQxMTI4ZDM2NmQxMTI2ZDMzOWQxMTE3ZDMxMmQxMTA4ZDI5NmQxMDg4ZDI2NGQxMDU0ZDI0NWQxMDA2ZDIyNmQ5NThkMjI4ZDkxMGQyMzJkODYwZDI1MmQ4MTVkMjcyZDc3MGQyNzdkNzQxZDI4MmQ3MTJkMjc1ZDcwM2QyNjhkNjk0ZDI1M2Q2ODRkMjM4ZDY3NGQyMTJkNjcxLjVkMTg2ZDY2OWQxNzZkNjY5ZDE2NGQ2NjlkMTUyZDY2NmQxNDhkNjUxLjVkMTQ0ZDYzN2QxNDhkNjI0LjVkMTUyZDYxMmQxNjZkNjA5ZDE3OWQ2MDlkMTg3ZDYwOWQyMTQuNWQ2MDUuNWQyNDJkNjAyZDI1NGQ1OTJkMjY2ZDU4MmQyNzFkNTYyZDI3NmQ1NDJkMjczZDUyNGQyNzBkNTA2ZDI1MWQ0NzJkMjMyZDQzOGQyMzJkMzc0ZDIzNmQzMjZkMjU3ZDI4NGQyNzhkMjQyZDMwNmQyMTZkMzI2ZDIwMGQzNTFkMTg1ZDM3NmQxNzBkNDAwZDE2NGQ0MjJkMTcwZDQyNWQxODBkNDI4ZDE5MGQ0MjdkMTk5ZDQyNmQyMDhkNDIyZDIxMmQ0MThkMjE2ZDQwOGQyMjJkMzkwZDIyOGQzNjJkMjQ2ZDM0OGQyNTZkMzM3ZDI2OGQzMjZkMjgwZDMwOWQzMTFkMjkyZDM0MmQyOTBkMzcyZDI5MGQ0NDhkMzEyZDQ4OWQzMzRkNTMwZDMzMGQ1NjBkMzI2ZDU5MGQzMTZkNjA2ZDMwNmQ2MjJkMjk0ZDYzOGQzMjBkNjU4ZDMzMGQ2ODVkMzQwZDcxMmQzMzNkNzU1ZDMyNmQ3OThkMzA1ZDg0MmQyODRkODg2ZDI4NGQ5MTBkMjg4ZDk2OGQzMDRkOTk4ZDMyMGQxMDI4ZDMzNmQxMDQ2ZDM1MmQxMDY0ZDM3N2QxMDY2ZDQwMmQxMDY4ZDQyMmQxMDgwZDQyOGQxMDk4ZDQyN2QxMTA3ZDQyNmQxMTE2ZDQyMGQxMTIyZDQxNGQxMTI4ZDM5NmQxMTI4aFIyZDUxMlIzZDQyN1I0ZDE0OFI1ZDg2MFI2ZC0xMDRSN2Q3MTJSOGQwUjlkMTQ0UjEwaTEyM1IxMWQxNDhSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjM1b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjM1UjExZDBSMTJkNTEyUjEzYWhnOjEyMm9SMGQ4ODBSMWFkMTIwZDEwMTZkODhkMTAxNmQ3MGQxMDA0ZDU2ZDk5MmQ2NGQ5NjBkOTZkODk4ZDEyNmQ4NjFkMTU2ZDgyNGQxODZkNzgyZDE1NGQ3NjZkMTQ0ZDc1NmQxNDhkNzM2ZDE1NGQ3MjRkMTcwZDcxNmQxODJkNzE2ZDE4OGQ3MTZkMjE4ZDczMmQyNDhkNjk2ZDI3MGQ2NjFkMjkyZDYyNmQzMTBkNTkwZDI3NGQ1OTJkODRkNTkyZDcwZDU5MGQ2MmQ1ODBkNTJkNTY4ZDU2ZDU1NGQ1OGQ1NDJkNzZkNTM0ZDI3NmQ1MzRkMzgyZDUzMmQzOThkNTM2ZDQwMmQ1NTJkNDA0ZDU1OGQ0MDJkNTY4ZDM3MGQ2MTRkMzQwZDY2M2QzMTBkNzEyZDI2OGQ3NjZkMzA0ZDc4NmQzMTRkNzk4ZDMxMGQ4MTRkMzAyZDgyOGQyOTBkODM0ZDI3OGQ4MzhkMjcwZDgzNGQyMzZkODE0ZDIxNGQ4NDRkMTk1ZDg3MGQxNzZkODk2ZDEzNmQ5NjBkMjc0ZDk1OGQ0MTRkOTU4ZDQyOGQ5NjBkNDM0ZDk3OGQ0MzZkOTg4ZDQzNGQ5OTZkNDMwZDEwMTJkNDE0ZDEwMTZkMjcyZDEwMTZkMTIwZDEwMTZoUjJkNTEyUjNkNDM0UjRkNTZSNWQ0OTJSNmQ4UjdkNDM2UjhkMFI5ZDE0NFIxMGkxMjJSMTFkNTZSMTJkNTEyUjEzYWkxaTNpM2kzaTNpMmkzaTNpM2kyaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2hnOjIzNG9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIzNFIxMWQwUjEyZDUxMlIxM2FoZzoxMjFvUjBkODgwUjFhZDc4ZDExNDZkNjJkMTE0NGQ1NmQxMTM0ZDQ2ZDExMjJkNTBkMTEwNGQ1NGQxMDg4ZDcwZDEwODRkOTZkMTA4MmQxMTlkMTA3M2QxNDJkMTA2NGQxNjhkMTAzNmQxODhkMTAxNmQyMThkOTY1ZDIzMmQ5NDRkMjQ0ZDkwNGQxOTZkODIwZDE1NWQ3MjBkMTE4ZDYzNmQ4MGQ1NTJkNzZkNTMwZDk2ZDUyOGQxMDRkNTI2ZDEyMGQ1MjhkMTMyZDUzNGQxNDBkNTQ4ZDE0OGQ1NjJkMTU0ZDU3NmQxODRkNjQwZDIxMmQ3MDVkMjQwZDc3MGQyNzRkODM0ZDMwMmQ3NThkMzMzZDY4MWQzNjRkNjA0ZDM5MmQ1MzBkNDAwZDUxNmQ0MjJkNTIyZDQzOGQ1MjhkNDQyZDU0MmQ0NDRkNTUwZDQ0MmQ1NThkNDIyZDYxNmQzODZkNzAyZDM1N2Q3ODBkMzEwZDkxMmQyODZkOTY2ZDI2MmQxMDExZDIyMGQxMDcyZDE4MmQxMTE2ZDE0N2QxMTMwZDExMmQxMTQ0ZDc4ZDExNDZoUjJkNTEyUjNkNDQyUjRkNTBSNWQ1MDJSNmQtMTIyUjdkNDUyUjhkMFI5ZDE0NFIxMGkxMjFSMTFkNTBSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpMmkzaTJpM2kzaGc6MjMzb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjMzUjExZDBSMTJkNTEyUjEzYWhnOjEyMG9SMGQ4ODBSMWFkMTAwZDEwMjJkODRkMTAxOGQ4MGQxMDA0ZDc0ZDk5NGQ4MGQ5ODBkMTE4ZDkyNmQxNTNkODc1ZDE4OGQ4MjRkMjMwZDc2OGQxOTRkNzEyZDE1MWQ2NTZkMTA4ZDYwMGQ5M2Q1NzlkNzhkNTU4ZDc4ZDU0NGQ4MmQ1MjZkOThkNTI0ZDExNGQ1MTZkMTI4ZDUzMGQxNThkNTY0ZDE5NGQ2MTRkMjMwZDY2NGQyNjRkNzE0ZDMwMmQ2NjhkMzM0ZDYyMWQzNjZkNTc0ZDM5MmQ1NDZkNDA0ZDUzMmQ0MjJkNTM2ZDQzNmQ1NDBkNDQwZDU1NGQ0NDRkNTY0ZDQ0MGQ1NzhkNDA4ZDYyMmQzNzJkNjcxZDMzNmQ3MjBkMzA0ZDc3MGQzNDJkODM2ZDM4MWQ4OTBkNDIwZDk0NGQ0NDhkOTg4ZDQ1NmQxMDEyZDQ0MGQxMDIwZDQyNmQxMDMwZDQwOGQxMDIwZDM4NGQxMDA0ZDM0NGQ5NDRkMzA0ZDg4NGQyNjRkODIwZDIyMmQ4NzhkMTg5ZDkyN2QxNTZkOTc2ZDEyOGQxMDEyZDExOGQxMDI0ZDEwMGQxMDIyaFIyZDUxMlIzZDQ0OFI0ZDc4UjVkNTAwUjZkMlI3ZDQyMlI4ZDBSOWQxNDRSMTBpMTIwUjExZDc4UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIzMm9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIzMlIxMWQwUjEyZDUxMlIxM2FoZzoxMTlvUjBkODgwUjFhZDM1MmQxMDE0ZDM0MGQxMDEyZDMzMmQ5OTRkMzE0ZDk0MGQzMDNkODk4ZDI3NmQ4MDBkMjU1ZDc0MmQyMzhkODA0ZDIxN2Q5MDZkMjEwZDk0MGQyMDFkOTY5ZDE5MmQ5OThkMTg0ZDEwMDhkMTc2ZDEwMThkMTYyZDEwMTZkMTU0ZDEwMTRkMTQ4ZDEwMDhkMTQyZDEwMDBkMTMyZDk2OGQxMTJkOTA0ZDgyZDc0OGQ2OGQ2NjhkNDhkNTkyZDQwZDU0MmQ0MGQ1MjZkNTJkNTE4ZDY0ZDUxMGQ3OGQ1MTRkOTRkNTE4ZDk4ZDUzNGQxMDZkNTg0ZDExOGQ2MjJkMTM2ZDczNmQxNDhkNzkwZDE2NGQ4NzBkMTg3ZDc5MGQxOTdkNzYyZDIwOWQ3MjZkMjIzZDY5OWQyMzBkNjg4ZDI0MmQ2ODJkMjUyZDY3N2QyNjJkNjgxZDI3MmQ2ODRkMjg1ZDY5OGQzMDhkNzM2ZDMyMC41ZDc3MGQzMzNkODA0ZDM1NmQ4NzhkMzc4ZDc4NmQzOTBkNzE0ZDQwNmQ2MThkNDEyZDU2NmQ0MTRkNTI2ZDQyNGQ1MTRkNDM2ZDUwNmQ0NTBkNTEwZDQ2NmQ1MTBkNDcwZDUyNmQ0NzJkNTQyZDQ3MmQ1NThkNDcwZDU2OGQ0NjZkNjA0ZDQ1NmQ2NjhkNDQyZDczMmQ0MTBkOTAwZDM5NGQ5NTZkMzgyZDk5NmQzNzZkMTAwNGQzNjhkMTAxNGQzNTJkMTAxNGhSMmQ1MTJSM2Q0NzJSNGQ0MFI1ZDUxNFI2ZDhSN2Q0NzRSOGQwUjlkMTQ0UjEwaTExOVIxMWQ0MFIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMzFvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMzFSMTFkMFIxMmQ1MTJSMTNhaGc6MTE4b1IwZDg4MFIxYWQyNDJkMTAyMmQyMzBkMTAxOGQyMjJkMTAwMGQxODZkODk0ZDE0NGQ3ODFkMTAyZDY2OGQ4NGQ2MTlkNjZkNTcwZDY0ZDU1NGQ2OGQ1MzZkODRkNTMyZDkyZDUyOGQxMDBkNTMyZDExNGQ1MzZkMTIyZDU1NmQxMzBkNTc0ZDE0M2Q2MDhkMTU2ZDY0MmQxODhkNzI1ZDIyMGQ4MDhkMjQ4ZDg5NGQyODBkODA0ZDMxMmQ3MThkMzQ0ZDYzMmQzODhkNTU0ZDQwMmQ1MzJkNDI2ZDUzOGQ0NDRkNTQyZDQ0NmQ1NjBkNDQ4ZDU3MGQ0NDZkNTc4ZDQ0NGQ1OTBkNDMyZDU5OGQ0MjRkNjA4ZDM4MmQ3MDhkMzQxZDgxNGQzMDBkOTIwZDI4NmQ5NjJkMjcyZDEwMDRkMjY4ZDEwMTZkMjU2ZDEwMjZkMjQyZDEwMjJoUjJkNTEyUjNkNDQ2UjRkNjRSNWQ0OTJSNmQyUjdkNDI4UjhkMFI5ZDE0NFIxMGkxMThSMTFkNjRSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaGc6MjMwb1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjMwUjExZDBSMTJkNTEyUjEzYWhnOjExN29SMGQ4ODBSMWFkNDA2ZDEwNDZkMzkwZDEwNDJkMzg0ZDEwMjZkMzc4ZDk1OGQzMjJkOTkwZDI4MGQ5OThkMjM4ZDEwMDZkMTgwZDEwMDZkMTU0ZDEwMDJkMTI2ZDk4NGQ5OGQ5NjZkODJkOTM5ZDY2ZDkxMmQ2NGQ4NjBkNjJkODA4ZDY2ZDczNGQ3MGQ2NjBkNjhkNjEzZDY2ZDU2NmQ2OGQ1NTJkNzJkNTM4ZDg4ZDUzMmQ5NmQ1MjhkMTA0ZDUzMmQxMjJkNTM2ZDEyNmQ1NTZkMTI2ZDU2OGQxMjZkNjE0ZDEyNmQ2NjBkMTIwZDgyNmQxMjJkODQ4ZDEyNGQ4NzRkMTI2ZDkwMGQxNDBkOTE1ZDE1NGQ5MzBkMTY5ZDkzOGQxODRkOTQ2ZDIxOGQ5NDJkMjUyZDkzOGQyODNkOTMxZDMxNGQ5MjRkMzM1ZDkxMGQzNTZkODk2ZDM2NGQ4NzBkMzcyZDg0NGQzNzdkODEyZDM4MmQ3ODBkMzc5ZDcyMGQzNzZkNjYwZDM3NGQ1NzBkMzc2ZDU1MmQzODhkNTQ0ZDQwNmQ1MzZkNDIwZDU0NGQ0MzBkNTQ4ZDQzMmQ1NjJkNDM0ZDY0NGQ0MzVkNzAyZDQzNmQ3NjBkNDM2ZDc5M2Q0MzZkODI2ZDQzNWQ4NjVkNDM0ZDkwNGQ0NDJkMTAyNmQ0MzhkMTA0MmQ0MjZkMTA0NmQ0MTRkMTA1MGQ0MDZkMTA0NmhSMmQ1MTJSM2Q0NDJSNGQ2NFI1ZDQ5MlI2ZC0yMlI3ZDQyOFI4ZDBSOWQxNDRSMTBpMTE3UjExZDY0UjEyZDUxMlIxM2FpMWkzaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjI5b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjI5UjExZDBSMTJkNTEyUjEzYWhnOjExNm9SMGQ4ODBSMWFkMjg2ZDEwMjRkMjYwZDEwMjJkMjQyZDEwMTRkMjI0ZDEwMDZkMjA2ZDk4MmQxODhkOTU4ZDE4M2Q5MjVkMTc4ZDg5MmQxNzVkODQ2ZDE3MmQ4MDBkMTgxZDcwM2QxOTBkNjA2ZDE5MGQ1NjRkMTUwZDU2NmQxMzFkNTY4ZDExMmQ1NzBkODZkNTcwZDcwZDU2NGQ2NmQ1NTBkNjRkNTQyZDY2ZDUzMmQ3MGQ1MjBkODRkNTEyZDE5NmQ1MDRkMjA0ZDMzOGQxOTZkMjg4ZDE5OGQyNzRkMjA4ZDI2NmQyMThkMjU2ZDIzNmQyNjBkMjUwZDI2MmQyNTZkMjgwZDI2MmQzMzZkMjU0ZDUwMmQzMTZkNDk4ZDM0MGQ0OTdkMzY0ZDQ5NmQzOThkNDk2ZDQwNGQ0OThkNDEwZDUwNGQ0MTZkNTEwZDQxOGQ1MThkNDE4ZDUzNGQ0MTZkNTQwZDQxMGQ1NDZkNDA0ZDU1MmQzOThkNTU0ZDI0OGQ1NjRkMjQ4ZDYwNmQyMzhkNzAzZDIyOGQ4MDBkMjMyZDg0OGQyMzZkODk2ZDIzOGQ5MTFkMjQwZDkyNmQyNDNkOTMzZDI0NmQ5NDBkMjU0ZDk1MGQyNjJkOTYwZDI2OWQ5NjRkMjc2ZDk2OGQzMDRkOTY2ZDMyMmQ5NjRkMzM4ZDk1NmQzNTRkOTQ4ZDM3NmQ5NDJkMzkyZDk0NGQzOTZkOTY0ZDQwMGQ5NzRkMzkyZDk4OGQzNzZkMTAwNGQzNjZkMTAwOGQzNTZkMTAxMmQzMzZkMTAxOGQzMTZkMTAyNGQyODZkMTAyNGhSMmQ1MTJSM2Q0MThSNGQ2NlI1ZDc2NFI2ZDBSN2Q2OThSOGQwUjlkMTQ0UjEwaTExNlIxMWQ2NlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTJpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMjhvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMjhSMTFkMFIxMmQ1MTJSMTNhaGc6MTE1b1IwZDg4MFIxYWQxODhkMTAyNGQxNjBkMTAyNGQxMzhkMTAxNGQxMTZkMTAwNGQ5OGQ5ODJkOTJkOTc0ZDk1ZDk1OWQ5OGQ5NDRkMTEyZDk0MGQxMjZkOTM2ZDEzNmQ5NDRkMTQ2ZDk1NGQxNjRkOTYzZDE4MmQ5NzJkMjE1ZDk3MGQyNDhkOTY4ZDI4N2Q5NThkMzI2ZDk0OGQzNDZkOTMxZDM2NmQ5MTRkMzcwZDkwMGQzNzRkODg2ZDM2OGQ4NjhkMzYyZDg1MGQzNDlkODM1ZDMzNmQ4MjBkMzA0ZDgwNmQyNTBkNzk2ZDE5OWQ3ODFkMTQ4ZDc2NmQxMjNkNzM3ZDk4ZDcwOGQ5NWQ2OTVkOTJkNjgyZDk0ZDY1OWQ5NmQ2MzZkMTA0ZDYxMmQxMTJkNTg4ZDE0NGQ1NjJkMTc2ZDUzNmQyMTdkNTMxZDI1OGQ1MjZkMzAxZDUzMGQzNDRkNTM0ZDM2OGQ1NDFkMzkyZDU0OGQ0MThkNTcwZDQyOGQ1ODRkNDI0ZDU5OGQ0MjBkNjEyZDQwNGQ2MThkMzk0ZDYyMGQzODRkNjE0ZDM1NmQ1OTJkMzE2ZDU4N2QyNzZkNTgyZDI0MmQ1ODVkMjA4ZDU4OGQyMDBkNTkxZDE5MmQ1OTRkMTc1ZDYwOWQxNThkNjI0ZDE1NGQ2MzdkMTUwZDY1MGQxNTJkNjcxZDE1NGQ2OTJkMTg0ZDcxMWQyMTRkNzMwZDI1MGQ3MzdkMjg2ZDc0NGQzMThkNzUyZDM1MGQ3NjBkMzk2ZDgwNGQ0MTJkODI0ZDQyM2Q4NDZkNDM0ZDg2OGQ0MzFkODk0ZDQyOGQ5MjBkNDE3ZDk0MWQ0MDZkOTYyZDM3M2Q5ODNkMzQwZDEwMDRkMjkxZDEwMTRkMjQyZDEwMjRkMTg4ZDEwMjRoUjJkNTEyUjNkNDMxUjRkOTRSNWQ0OTRSNmQwUjdkNDAwUjhkMFI5ZDE0NFIxMGkxMTVSMTFkOTRSMTJkNTEyUjEzYWkxaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaGc6MjI3b1IwZDg4MFIxYWhSMmQ1MTJSM2QwUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQxNDRSMTBpMjI3UjExZDBSMTJkNTEyUjEzYWhnOjExNG9SMGQ4ODBSMWFkMTU0ZDEwMzRkMTM0ZDEwMzJkMTMyZDEwMjJkMTMwZDk5OGQxMzZkOTIwZDE0MmQ4NThkMTQ2ZDgwNmQxNTBkNzU0ZDE1MGQ2OTRkMTUyZDU4OGQxNDRkNTI2ZDE1MmQ1MTRkMTU5ZDUxMWQxNjZkNTA4ZDE3OGQ1MDZkMTkyZDUwOGQyMDJkNTE4ZDIxNGQ1ODZkMjEyZDY1NGQyMTJkNjkwZDI1MGQ2NDJkMjgzZDYxNGQzMTZkNTg2ZDM2NmQ1NjRkNDA4ZDU0OGQ0MzhkNTUyZDQ1NGQ1NTZkNDU4ZDU3OGQ0NjJkNjA2ZDQzNmQ2MTJkMzk0ZDYyMGQzNThkNjQwZDMxMmQ2NzZkMjgzZDcwNmQyNTRkNzM2ZDI0MWQ3NThkMjI4ZDc4MGQyMTRkODAyZDIwNGQ4MDRkMjAwZDgzNGQxOTlkODYzZDE5OGQ4OTJkMTk2ZDk4MGQxOTZkOTk2ZDE5NGQxMDI0ZDE4OGQxMDM0ZDE1NGQxMDM0aFIyZDUxMlIzZDQ1OFI0ZDEzMlI1ZDUxOFI2ZC0xMFI3ZDM4NlI4ZDBSOWQxNDRSMTBpMTE0UjExZDEzMlIxMmQ1MTJSMTNhaTFpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kyaTNpM2kzaTNoZzoyMjZvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMjZSMTFkMFIxMmQ1MTJSMTNhaGc6MTEzb1IwZDg4MFIxYWQzOTJkMTE1MmQzNzhkMTA5NGQzNzJkMTA0N2QzNjZkMTAwMGQzNjdkOTYwZDM2OGQ5MjBkMzY4ZDg4OGQzNDRkOTEyZDMxNWQ5MTlkMjg2ZDkyNmQyNTBkOTI1ZDIxNGQ5MjRkMTc3ZDkwNWQxNDBkODg2ZDEwNWQ4NTNkNzBkODIwZDU3ZDc4MGQ0NGQ3NDBkNDhkNjkzZDUyZDY0NmQ2N2Q2MTdkODJkNTg4ZDEyM2Q1NjFkMTY0ZDUzNGQyMTNkNTMwZDI2MmQ1MjZkMzA1ZDUzMGQzNDhkNTM0ZDM4NmQ1NThkMzk2ZDUzOGQ0MDZkNTMyZDQyMmQ1MzJkNDM4ZDUzNmQ0NDJkNTUyZDQ0MmQ1ODBkNDM5ZDY1OWQ0MzZkNzM4ZDQzNGQ3ODdkNDMyZDgzNmQ0MjlkODg0ZDQyNmQ5MzJkNDI3ZDk3OWQ0MjhkMTAyNmQ0MzRkMTA2MWQ0NDBkMTA5NmQ0NDZkMTE0MGQ0MzZkMTE1MGQ0MjJkMTE1NmQ0MDRkMTE1OGQzOTJkMTE1MmQzMTZkODYwZDMzNmQ4NTBkMzQ3ZDg0MWQzNThkODMyZDM3NmQ4MTZkMzgwZDc1MmQzODJkNzI0ZDM4NGQ2OTZkMzg0ZDYzNmQzNjZkNjI2ZDM1MGQ2MDRkMzI0ZDU4OGQyOTNkNTgzZDI2MmQ1NzhkMjIxZDU4MGQxODBkNTgyZDE0OWQ2MDhkMTE4ZDYzNGQxMTFkNjY1ZDEwNGQ2OTZkMTA4ZDczNGQxMTJkNzcyZDEyNmQ3OTNkMTQwZDgxNGQxNjlkODM2ZDE5OGQ4NThkMjIzZDg2NmQyNDhkODc0ZDI2OGQ4NzRkMjg4ZDg3NGQzMTZkODYwaFIyZDUxMlIzZDQ0NlI0ZDQ4UjVkNDk0UjZkLTEzMlI3ZDQ0NlI4ZDBSOWQxNDRSMTBpMTEzUjExZDQ4UjEyZDUxMlIxM2FpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpMmkzaTNpM2kzaTNpM2kzaTNpM2kzaTFpM2kzaTNpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2hnOjIyNW9SMGQ4ODBSMWFoUjJkNTEyUjNkMFI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMTQ0UjEwaTIyNVIxMWQwUjEyZDUxMlIxM2FoZzoxMTJvUjBkODgwUjFhZDg2ZDExNTZkNzJkMTE1M2Q2NmQxMTQyZDcyZDEwODZkNzdkMTAxNWQ4MmQ5NDRkODJkODI2ZDgyZDcwOGQ4NmQ2MTBkOTBkNTQ0ZDk2ZDUzNGQxMTdkNTM2ZDEzOGQ1MzZkMTYwZDUzOGQyNjBkNTI2ZDMwOGQ1MzlkMzU2ZDU1MmQzODBkNTY4ZDQwNGQ1ODRkNDI1ZDYxMGQ0NDZkNjM2ZDQ1NGQ2NzRkNDYyZDcxMmQ0NTdkNzUwZDQ1MmQ3ODhkNDMwZDgyN2Q0MDhkODY2ZDM3MmQ4OTRkMzM2ZDkyMmQyOTVkOTI4ZDI1NGQ5MzRkMjI2ZDkzM2QxOThkOTMyZDE3OWQ5MjVkMTYwZDkxOGQxNDBkOTE4ZDEzNGQ5NzhkMTMzZDEwMzRkMTMyZDEwOTBkMTIyZDExNDRkMTEyZDExNTRkOThkMTE1NmQ4NmQxMTU2ZDMzNGQ4NjBkMzY4ZDgzMGQzODdkNzg3ZDQwNmQ3NDRkNDAxZDcwNmQzOTZkNjY4ZDM4NGQ2NTFkMzcyZDYzNGQzNThkNjIxZDM0NGQ2MDhkMzE2ZDU5N2QyODhkNTg2ZDI1NGQ1ODZkMjIwZDU4NmQxODdkNTg5ZDE1NGQ1OTJkMTQyZDYwMmQxNDJkNjg2ZDE0MmQ3MzhkMTQyZDc5MGQxNDRkODQ4ZDE2OGQ4NjhkMTk1ZDg3NWQyMjJkODgyZDI0NWQ4ODJkMjY4ZDg4MmQyODhkODc4ZDMwOGQ4NzRkMzM0ZDg2MGhSMmQ1MTJSM2Q0NTdSNGQ2NlI1ZDQ4OFI2ZC0xMzJSN2Q0MjJSOGQwUjlkMTQ0UjEwaTExMlIxMWQ2NlIxMmQ1MTJSMTNhaTFpMmkyaTNpM2kzaTJpM2kyaTJpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kyaTNpMWkzaTNpM2kzaTNpM2kzaTNpM2kzaTNpM2kzaTNoZzoyMjRvUjBkODgwUjFhaFIyZDUxMlIzZDBSNGQwUjVkMFI2ZDBSN2QwUjhkMFI5ZDE0NFIxMGkyMjRSMTFkMFIxMmQ1MTJSMTNhaGdo"}];
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
jeash.text.Font.DEFAULT_FONT_SCALE = 9.0;
jeash.text.Font.DEFAULT_FONT_NAME = "Bitstream_Vera_Sans";
jeash.text.Font.DEFAULT_CLASS_NAME = "jeash.text.Font";
jeash.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
jeash.display.DisplayObject.mNameID = 0;
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
jeash.Lib.VENDOR_HTML_TAG = "data-";
jeash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseup","mouseover","mouseout","mousemove","mousedown","mousewheel","dblclick","click"];
jeash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize"];
jeash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
jeash.Lib.JEASH_IDENTIFIER = "haxe:jeash";
jeash.Lib.DEFAULT_WIDTH = 500;
jeash.Lib.DEFAULT_HEIGHT = 500;
jeash.display.BitmapData.mNameID = 0;
jeash.display.Graphics.RADIAL = 1;
jeash.display.Graphics.END_NONE = 0;
jeash.display.Graphics.END_ROUND = 256;
jeash.display.Graphics.END_SQUARE = 512;
jeash.display.Graphics.CORNER_ROUND = 0;
jeash.display.Graphics.CORNER_MITER = 4096;
jeash.display.Graphics.CORNER_BEVEL = 8192;
jeash.display.Graphics.PIXEL_HINTING = 16384;
jeash.display.Graphics.SCALE_NONE = 0;
jeash.display.Graphics.SCALE_VERTICAL = 1;
jeash.display.Graphics.SCALE_HORIZONTAL = 2;
jeash.display.Graphics.SCALE_NORMAL = 3;
jeash.display.Graphics.MOVE = 0;
jeash.display.Graphics.LINE = 1;
jeash.display.Graphics.CURVE = 2;
jeash.display.Graphics.JEASH_MAX_DIMENSION = 5000;
jeash.events.Event.ACTIVATE = "activate";
jeash.events.Event.ADDED = "added";
jeash.events.Event.ADDED_TO_STAGE = "addedToStage";
jeash.events.Event.COMPLETE = "complete";
jeash.events.Event.ENTER_FRAME = "enterFrame";
jeash.events.Event.OPEN = "open";
jeash.events.Event.REMOVED = "removed";
jeash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
jeash.events.Event.RENDER = "render";
jeash.events.Event.RESIZE = "resize";
jeash.events.MouseEvent.CLICK = "click";
jeash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
jeash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
jeash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
jeash.events.MouseEvent.MOUSE_OUT = "mouseOut";
jeash.events.MouseEvent.MOUSE_OVER = "mouseOver";
jeash.events.MouseEvent.MOUSE_UP = "mouseUp";
jeash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
jeash.events.MouseEvent.ROLL_OUT = "rollOut";
jeash.events.MouseEvent.ROLL_OVER = "rollOver";
jeash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
jeash.events.TouchEvent.TOUCH_END = "touchEnd";
jeash.events.TouchEvent.TOUCH_MOVE = "touchMove";
jeash.events.TouchEvent.TOUCH_OUT = "touchOut";
jeash.events.TouchEvent.TOUCH_OVER = "touchOver";
jeash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
jeash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
jeash.display.Stage.jeashMouseChanges = [jeash.events.MouseEvent.MOUSE_OUT,jeash.events.MouseEvent.MOUSE_OVER,jeash.events.MouseEvent.ROLL_OUT,jeash.events.MouseEvent.ROLL_OVER];
jeash.display.Stage.jeashTouchChanges = [jeash.events.TouchEvent.TOUCH_OUT,jeash.events.TouchEvent.TOUCH_OVER,jeash.events.TouchEvent.TOUCH_ROLL_OUT,jeash.events.TouchEvent.TOUCH_ROLL_OVER];
jeash.display.Stage.DEFAULT_FRAMERATE = 60.0;
jeash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
jeash.display.StageQuality.BEST = "best";
jeash.events.Listener.sIDs = 1;
jeash.events.EventPhase.CAPTURING_PHASE = 0;
jeash.events.EventPhase.AT_TARGET = 1;
jeash.events.EventPhase.BUBBLING_PHASE = 2;
jeash.events.FocusEvent.FOCUS_IN = "FOCUS_IN";
jeash.events.FocusEvent.FOCUS_OUT = "FOCUS_OUT";
jeash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
jeash.events.IOErrorEvent.IO_ERROR = "IO_ERROR";
jeash.events.KeyboardEvent.KEY_DOWN = "KEY_DOWN";
jeash.events.KeyboardEvent.KEY_UP = "KEY_UP";
jeash.events.ProgressEvent.PROGRESS = "progress";
jeash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
jeash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
jeash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
jeash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
jeash.media.Sound.EXTENSION_MP3 = "mp3";
jeash.media.Sound.EXTENSION_OGG = "ogg";
jeash.media.Sound.EXTENSION_WAV = "wav";
jeash.media.Sound.EXTENSION_AAC = "aac";
jeash.text.TextField.mDefaultFont = "Bitstream_Vera_Sans";
jeash.text.FontInstance.mSolidFonts = new Hash();
jeash.text.TextFieldAutoSize.CENTER = "CENTER";
jeash.text.TextFieldAutoSize.LEFT = "LEFT";
jeash.text.TextFieldAutoSize.NONE = "NONE";
jeash.text.TextFieldAutoSize.RIGHT = "RIGHT";
jeash.text.TextFieldType.DYNAMIC = "DYNAMIC";
jeash.text.TextFieldType.INPUT = "INPUT";
jeash.ui.Keyboard.BACKSPACE = 8;
jeash.ui.Keyboard.TAB = 9;
jeash.ui.Keyboard.ENTER = 13;
jeash.ui.Keyboard.SHIFT = 16;
jeash.ui.Keyboard.CONTROL = 17;
jeash.ui.Keyboard.CAPS_LOCK = 18;
jeash.ui.Keyboard.ESCAPE = 27;
jeash.ui.Keyboard.SPACE = 32;
jeash.ui.Keyboard.PAGE_UP = 33;
jeash.ui.Keyboard.PAGE_DOWN = 34;
jeash.ui.Keyboard.END = 35;
jeash.ui.Keyboard.HOME = 36;
jeash.ui.Keyboard.LEFT = 37;
jeash.ui.Keyboard.RIGHT = 39;
jeash.ui.Keyboard.UP = 38;
jeash.ui.Keyboard.DOWN = 40;
jeash.ui.Keyboard.INSERT = 45;
jeash.ui.Keyboard.DELETE = 46;
jeash.ui.Keyboard.NUMLOCK = 144;
jeash.ui.Keyboard.BREAK = 19;
jeash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
jeash.ui.Keyboard.DOM_VK_TAB = 9;
jeash.ui.Keyboard.DOM_VK_RETURN = 13;
jeash.ui.Keyboard.DOM_VK_ENTER = 14;
jeash.ui.Keyboard.DOM_VK_SHIFT = 16;
jeash.ui.Keyboard.DOM_VK_CONTROL = 17;
jeash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
jeash.ui.Keyboard.DOM_VK_ESCAPE = 27;
jeash.ui.Keyboard.DOM_VK_SPACE = 32;
jeash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
jeash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
jeash.ui.Keyboard.DOM_VK_END = 35;
jeash.ui.Keyboard.DOM_VK_HOME = 36;
jeash.ui.Keyboard.DOM_VK_LEFT = 37;
jeash.ui.Keyboard.DOM_VK_UP = 38;
jeash.ui.Keyboard.DOM_VK_RIGHT = 39;
jeash.ui.Keyboard.DOM_VK_DOWN = 40;
jeash.ui.Keyboard.DOM_VK_INSERT = 45;
jeash.ui.Keyboard.DOM_VK_DELETE = 46;
jeash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
jeash.utils.ByteArray.BYTE_ARRAY_BUFFER_SIZE = 8192;
js.Lib.onerror = null;
ApplicationMain.main();
})()