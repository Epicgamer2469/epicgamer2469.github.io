package;

import flixel.util.FlxColor;
import flixel.FlxG;
import flixel.FlxObject;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxEase;
import flixel.tweens.FlxTween;

class MenuState extends FlxState
{
	public static var mines:Int = 1;
	var mineText:FlxText;
	
	override public function create()
	{
		FlxG.sound.playMusic("assets/music/menu.wav", .4);

		mineText = new FlxText(0, 0, 0, Std.string(mines));
		mineText.setFormat(("assets/fonts/vcr.ttf"), 20, FlxColor.WHITE, CENTER, FlxTextBorderStyle.OUTLINE, FlxColor.BLACK);
		mineText.screenCenter(X);
		add(mineText);

		
		super.create();
	}

	override public function update(elapsed:Float)
	{
		if (FlxG.keys.justPressed.LEFT || FlxG.keys.justPressed.A)
            {
                mines -= 1;
				switchNumber();
            }
		if (FlxG.keys.justPressed.RIGHT || FlxG.keys.justPressed.D)
            {
                mines += 1;
				switchNumber();
            }

		if (FlxG.keys.justPressed.ENTER)
            {
				FlxG.switchState(new PlayState());
            }
		super.update(elapsed);
	}

	function switchNumber()
		{
			if (mines > 24)
				mines = 1;
			if (mines < 1)
				mines = 24;

			FlxG.sound.play("assets/sounds/bump.wav", 2);	
			mineText.text = Std.string(mines);
		}
}