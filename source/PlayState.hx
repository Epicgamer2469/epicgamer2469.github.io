package;

import flixel.FlxG;
import flixel.FlxObject;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.group.FlxGroup.FlxTypedGroup;
import flixel.text.FlxText;
import flixel.tweens.FlxEase;
import flixel.tweens.FlxTween;
import flixel.util.FlxColor;

class PlayState extends FlxState
{
	public static var endOutput:String;
	var reRoll = false;

	var idCount = 1;
	var mines = MenuState.mines;

	var tiles:FlxTypedGroup<FlxSprite>;

	var curSelected:Int;
	var xThing = 0;
	var yThing = 90;
	var score = 0;
	var mineArray = [];
	var chosenArray = [];

	var title:FlxText;

	var info:FlxText;

	override public function create()
	{

		info = new FlxText(0, 0, 0, "# of Mines: " + mines + " || Score: " + score);
		info.setFormat(("assets/fonts/vcr.ttf"), 20, FlxColor.WHITE, CENTER, FlxTextBorderStyle.OUTLINE, FlxColor.BLACK);
		info.screenCenter(X);
		add(title);
		add(info);

		tiles = new FlxTypedGroup<FlxSprite>();

		for (i in 0...5)
			{
				for (v in 0...5)
					{
						var square = new FlxSprite(0, 0);
						square.loadGraphic("assets/images/default.png");
						square.y += yThing;
						square.x += 10 + (v * 78);
						square.ID = idCount;
						tiles.add(square);
						idCount ++;
					}
				yThing += 78;
			}
			
		add(tiles);

		for (i in 0...mines)
			{
						var roll = FlxG.random.int(1, 25);
						
						if (mineArray.contains(roll))
							reRoll = true;
						while (reRoll)
							{
								roll = FlxG.random.int(1, 25);
								if (!mineArray.contains(roll))
									reRoll = false;
							}
				mineArray.push(roll);
				reRoll = false;
    		}

		super.create();
	}

	override public function update(elapsed:Float)
	{
		tiles.forEach(function(spr:FlxSprite)
			{
				if (!chosenArray.contains(spr.ID))
					{
						if(!FlxG.mouse.overlaps(spr))
							spr.loadGraphic("assets/images/default.png");

						if (FlxG.mouse.overlaps(spr))
							{
								curSelected = spr.ID;
								spr.loadGraphic("assets/images/hover.png");
										
								if(FlxG.mouse.justPressed)
									flipCard();
							}
					}
					spr.updateHitbox();
			});
		super.update(elapsed);
	}

	function flipCard()
		{
			FlxG.sound.play("assets/sounds/flip.wav", 1.5);
			tiles.forEach(function(spr:FlxSprite)
				{
					if (mineArray.contains(curSelected) && spr.ID == curSelected)
						{					
							FlxG.sound.play("assets/sounds/explode.wav");	
							FlxG.camera.shake(.01, .2);	
							chosenArray.push(spr.ID);
							var toX = spr.x + 34;
							FlxTween.tween(spr, {x: toX, "scale.x": .2,}, .1, {ease: FlxEase.quadIn, onComplete: function(flxTween:FlxTween) 
								{ 
									spr.loadGraphic("assets/images/fail.png");
									FlxTween.tween(spr, {x: toX -= 34, "scale.x": 1,}, .1, {ease: FlxEase.quadOut});
								}});
							endOutput = 'lose';
						}
					else
						if(spr.ID == curSelected)
							{
								FlxG.sound.play("assets/sounds/success.mp3");	
								chosenArray.push(spr.ID);
								var toX = spr.x + 34;
								FlxTween.tween(spr, {x: toX, "scale.x": .2,}, .1, {ease: FlxEase.quadIn, onComplete: function(flxTween:FlxTween) 
									{ 
										spr.loadGraphic("assets/images/check.png");
										FlxTween.tween(spr, {x: toX -= 34, "scale.x": 1,}, .1, {ease: FlxEase.quadOut});
									}});
							}
				});
		}

/* 	function endScreen()
		{
			FlxG.sound.play("assets/sounds/flip.wav", 1.5);

			FlxTween.tween(menuItem,{y: 60 + (i * 160)},1 + (i * 0.25) ,{ease: FlxEase.expoInOut, onComplete: function(flxTween:FlxTween) 
				{ 

				}});
			tiles.forEach(function(spr:FlxSprite)
				{
					if (mineArray.contains(curSelected) && spr.ID == curSelected)
						{					
							FlxG.sound.play("assets/sounds/explode.wav");	
							FlxG.camera.shake(.05, .3);	
							chosenArray.push(spr.ID);
							spr.loadGraphic("assets/images/fail.png");
						}
					else
						if(spr.ID == curSelected)
							{
								FlxG.sound.play("assets/sounds/success.mp3");	
								chosenArray.push(spr.ID);
								spr.loadGraphic("assets/images/check.png");
							}
				});
		} */
}