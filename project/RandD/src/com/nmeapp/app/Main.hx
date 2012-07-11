package com.nmeapp.app;

import nme.display.Bitmap;
import nme.display.Shape;
import nme.display.Sprite;
import nme.display.StageDisplayState;
import nme.Lib;
import nme.Assets;

// fps & timer.
import nme.display.FPS;
import haxe.Timer;

// sound.
import nme.media.Sound;

// font.
import nme.text.Font;
import nme.text.TextFormat;
import nme.text.TextField;

// event.
import nme.events.Event;
import nme.events.MouseEvent;
import nme.events.TouchEvent;

/**
 * キャラ.
 * @author yatagai.
 */
class Chara
{
	private var m_test:Bitmap;
	private var m_vflag:Bool;
	private var m_hflag:Bool;
	
	public function new(stage:Main, chara_type:Int) {
		// init test.
		switch (chara_type) {
		case 0:
			m_test = new Bitmap(Assets.getBitmapData("graphics/standard/themes/theme0/tex_search_obj0.png"));
		case 1:
			m_test = new Bitmap(Assets.getBitmapData("graphics/standard/themes/theme0/tex_blue0.png"));
		case 2:
			m_test = new Bitmap(Assets.getBitmapData("graphics/standard/themes/theme0/tex_red0.png"));
		default:
			m_test = new Bitmap(Assets.getBitmapData("graphics/standard/themes/theme0/tex_search_obj0.png"));
		}
		stage.addChild(m_test);
		
		// init test animation flag.
		m_vflag = false;
		m_hflag = false;
		
	}
	
	/**
	 * update.
	 * @param	in delta_time デルタタイム.
	 */
	public function update(delta_time:Float) {
		var stage = Lib.current.stage;
		var speed = 300.0 * delta_time;
		var rotate_speed = 360 * delta_time;
		
		if (!m_hflag) {
			m_test.x += speed;
			if (m_test.x + 64 > stage.stageWidth) {
				m_hflag = true;
			}
		} else {
			m_test.x -= speed;
			if (m_test.x < 0) {
				m_hflag = false;
			}
		}
				
		if (!m_vflag) {
			m_test.y += speed;
			if (m_test.y + 64 > stage.stageHeight) {
				m_vflag = true;
			}
		} else {
			m_test.y -= speed;
			if (m_test.y < 0) {
				m_vflag = false;
			}
		}
		
		m_test.rotation += rotate_speed;
	}
}

/**
 * アプリケーション.
 * @author yatagai.
 */
class Main extends Sprite 
{	
	// fps.
	private var m_fps:FPS;
	
	// delta time.
	private var m_last_time_stamp:Float;
	private var m_delta_time:Float;
	
	// text.
	private var m_font:Font;
	private var m_text_format:TextFormat;
	private var m_text_field:TextField;
	
	// rect.
	private var m_rect:Sprite;
	
	// sound.
	private var m_bgm:Sound;
	private var m_se1:Sound;
	private var m_se2:Sound;
	
	// charactor.
	private var m_chara_array:Array<Chara>;
	private var m_counter:Float;
	private var m_chara_type:Int;
	
	/**
	 * コンストラクタ.
	 */
	public function new(){
		super();
		
		#if iphone
		Lib.current.stage.addEventListener(Event.RESIZE, appInit);
		#else
		addEventListener(Event.ADDED_TO_STAGE, appInit);
		#end
	}
	
	/**
	 * アプリケーションの初期化.
	 * @param	in event イベント.
	 */
	private function appInit(event:Event): Void {		
		// init fps.
		m_fps = new FPS(10.0, 10.0, 0xFFFFFF);
		m_fps.scaleX = 2.0;
		m_fps.scaleY = 2.0;
		addChild(m_fps);
		
		// init delta timer.
		m_last_time_stamp = Timer.stamp();
		
		// init font.
		m_font = Assets.getFont("font/yutapon_coding_081.ttf");
		m_text_format = new TextFormat(m_font.fontName, 24, 0xFFFFFF);
		m_text_field = new TextField();
		m_text_field.defaultTextFormat = m_text_format;
		m_text_field.selectable = false;
		m_text_field.embedFonts = true;
		m_text_field.width = 250;
		m_text_field.height = 40;
		m_text_field.x = 10;
		m_text_field.y = 35;
		m_text_field.text = "ObjectCount::";
		addChild(m_text_field);
		
		// init shape.
		m_rect = new Sprite();
		m_rect.x = 5;
		m_rect.y = 7;
		m_rect.alpha = 0.8;
		m_rect.graphics.beginFill(0x444444);
		m_rect.graphics.drawRect(0, 0, 260, 60);
		m_rect.graphics.endFill();
		addChild(m_rect);
		
		// init&play bgm.
		m_bgm = Assets.getSound("bgm/bgm000.mp3");
		#if !js
		// HTML5では、$bind関数が定義されないバグで再生できない(haxeのバグ。7月頭の開発リビジョンでは修正済みらしい。).
		//　HTML5では、サウンドの再生にHttpRequestを使っているのでHTTPサーバーをたてる必要がある.
		// HTML5では、そもそもブラウザごとに再生できるフォーマットが違う(共通で再生できるフォーマットすらない).
		// 上記の理由によりいろいろめんどくさいのでのでいったんjsはスルー.
		m_bgm.play(0, 1000);
		#end
		
		// init se.
		// flashはwav再生できるとFeaturesに書いてあるが実は非対応.
		#if !flash
		m_se1 = Assets.getSound("se/coin.wav");
		m_se2 = Assets.getSound("se/jump.wav");
		#else
		m_se1 = Assets.getSound("se/coin.mp3");
		m_se2 = Assets.getSound("se/jump.mp3");
		#end
		
		// init chara info.
		m_chara_array = new Array<Chara>();
		m_counter = 0;
		m_chara_type = 0;
		
		// add mouse & touch.
		#if !mobile
		stage.addEventListener(MouseEvent.MOUSE_DOWN, appMouseClick);
		#else
		stage.addEventListener(TouchEvent.TOUCH_BEGIN, appTouchTap);
		#end
		
		// add main loop.
		addEventListener(Event.ENTER_FRAME, appLoop);
	}
	
	/**
	 * メインループ.
	 * @param 	in event イベント.
	 */
	private function appLoop(event:Event): Void {
		// calculate delta time.
		var old_stamp = m_last_time_stamp;
		m_last_time_stamp = Timer.stamp();
		m_delta_time = m_last_time_stamp - old_stamp;
		if (m_delta_time >= 0.15) {
			m_delta_time = 0.15;
		}
		
		// add chara.
		m_counter += m_delta_time;
		if (m_counter >= 0.175) {
			m_chara_array.push(new Chara(this, m_chara_type));
			m_chara_type = (m_chara_type + 1) % 3;
			m_counter -= 0.175;
		}
		
		// update chara.
		for (i in 0...m_chara_array.length) {
			m_chara_array[i].update(m_delta_time);
		}
		
		// update text.
		m_text_field.text = "ObjectCount::" + m_chara_array.length;
		
		// どうやって常に一番手前に表示するのだろう...
		removeChild(m_rect);
		addChild(m_rect);
		removeChild(m_fps);
		addChild(m_fps);
		removeChild(m_text_field);
		addChild(m_text_field);
	}
	
	/**
	 * タッチタップ.
	 * @param 	in event イベント.
	 */
	private function appTouchTap(event:TouchEvent): Void {
		playTestSe();
	}
	
	/**
	 * マウスクリック.
	 * @param 	in event イベント.
	 */
	private function appMouseClick(event:MouseEvent): Void {
		playTestSe();
	}
	
	/**
	 * seの再生.
	 */
	private function playTestSe() : Void {
		#if !js
		if (Math.random() * 10 < 5.0) {
			m_se1.play();
		} else {
			m_se2.play();
		}
		#end
	}
	
	/**
	 * エントリーポイント.
	 */
	static public function main(): Void {
		var stage = Lib.current.stage;
		stage.scaleMode = nme.display.StageScaleMode.NO_SCALE;
		//stage.displayState = StageDisplayState.FULL_SCREEN;
		stage.align = nme.display.StageAlign.TOP_LEFT;
		
		Lib.current.addChild(new Main());
	}
}
