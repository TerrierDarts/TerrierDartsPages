---
title: "Heat - Core WS5"
description: "Connect to Heat with Streamer.bot and OBS. This Version only works with Websocket 5"
code: "1.4"
pubDate: "Feb 10 2023"
setUpDifficulty: "4/5"
heroImage: "../../heroImages/heat_ws5.png"
---

## Import Code

```bash
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
```

## Installation

After Importing the code you will have to make sure all the `Execute Code` sub-actions Compile they should but below are a list of refernces you may need if they do not.

```
System.Drawing.dll
System.dll
System.Net.dll
```

Next you need to set up the OBS Lock Event, which will update source positions if 'realTime' is set to false. (I will explain that a bit later). To find the OBS event you can go `Stream Apps >> OBS` and when you select your obs you can then right click on the events and add the following. `SceneItemLockStateChanged` and that is tied to the `[Heat] OBS Lock Event`.

![OBS LOCK EVENT](/buildImages/heat_core/LockEvent.png)

The next set is going to connect to the heat server. So you need to add a new connection, you can find this at `Servers and Clients >> Websocket Clients` you will need to add the following address `wss://heat-api.j38.net/channel/<YOUR ID>` and just swap in your channel ID. Finally you will need to add `[Heat] Message` Action to the Message Event. When set up correctly it will look like this.

![Heat Websocket Server](/buildImages/heat_core/heatWsClient.png)

Final Step is to add you actions, You will find these in `[Heat] Sources` you will notice from the import that there is a group. You just need to edit and duplicate for all the sources you wish to use. Then you will need to create actions of the **SAME NAME** which will be triggered on clicks. Meaning if you have a source called `Blue` then the action must be called `Blue` like seen below.

![Sources](/buildImages/heat_core/sources.png)

If you have done all that heat should be functional now.

## Configuration

In `[Heat] Message` they are a few settings. These will change how heat behaves for you. 

|Arugment|Purpose|
|---|---|
|`obsWebsocketId`| This is if you use more than one OBS i.e Streaming and Recording then you can use this to connect to the streaming one.|
|`allowAnon`| Heat requires the clicker (your viewers) to grant access to there ID's setting this to false will mean users who havent will have there clicks ignored, if its set to true then users who havent granted access will be handled as "someone" instead of their username if you choose to use user names.|
|`realTime`| Setting this to true means that your sources will be updated with each click, rather than with the lock event. This is not reccomented for high click volumes, false will just use the lock event|
|`debugMode`|This is on by default, you will want this off. The purpose of this is to help you follow the logic it is also helpful if you reach out for help in discords however for production you will want it off, but you may want it on just while setting up|

## Additional Information

You can click and press `Ctrl`, `Alt` and/or `Shift` (Will be slightly different for mac users)  [Check here for Info on the modifires](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState). You can use the following c# code below to have different actions based on said modifiers.

```cs
using System;

public class CPHInline
{
    public bool Execute()
    {
        bool alt = bool.Parse(args["alt"].ToString());
        bool ctrl = bool.Parse(args["ctrl"].ToString());
        bool shift = bool.Parse(args["shift"].ToString());
        string message;
        int flag = (alt ? 1 : 0) + (ctrl ? 2 : 0) + (shift ? 4 : 0);
        switch (flag)
        {
            case 1: //Just Alt
                message = "Just Alt";
                break;
            case 2: //Just Ctrl
                message = "Just Ctrl";
                break;
            case 4: // Just Shift
                message = "Just Shift";
                break;
            case 3: // Ctrl + Alt
                message = "Ctrl&Alt";
                break;
            case 5: //Alt + Shift
                message = "Alt&Shift";
                break;
            case 6: //Shift + Ctrl
                message = "Ctrl&Shift";
                break;
            case 7: //All3
                message = "ALL 3";
                break;
            default: //None
                message = "None or Error";
                break;
        }

        //CPH.SendMessage(message);
        return true;
    }
}

```

Here you can add something like `CPH.RunAction(string actionName)` under the `message=` to run the actions you want to or you can just code them in. Just note above is an example of how it can be done.

## Special Thanks

Special Thanks to Farlezz for this, the code here would not be possible without you.
