---
title: "Follow Age Responses"
description: "A C# Follow Age Action that output a different message based on the number of days followed"
pubDate: "Feb 09 2023"
code: "1.0"
setUpDifficulty: "2/5"
heroImage: "../../heroImages/follow_age.png"
---
## Import Code

```bash
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
```

## How To Install

After importing the **Import Code** you will need to create a command and tie it to the newly Imported `Action`. Most go with `!followage` but I left this up to you.

You will need to ensure that all the get info's are correct. Like in the image below the first get info should be getting it from `info` and the Add follow age info should be getting it from `follower`, which in the sub-action setting is under Variable. 

![Follow_Age_Info's](/buildImages/follow_age_infos.png)

## How to Configure

Configuration is done via arguments, in the examples I have provided you will see there is several groups, and in each group there is an arguement called `rangeX` and `messageX` and in our case `X` is the number or count of arguments, so when adding a new range make sure to make the number adjustment.

You will also need to make sure if you remove a range that you don't leave any number gaps. Otherwise you will find the higher numbers are not pulled in. The easy fix is to have the range equal `-1` that way it will the higher values will still be pulled in but you don't need to worry about that if you don't leave any gaps.

Ranges can be exact number or between 2 values (inclusive) meaning if you say that range4 is equal to `50-100` (be sure to not forget that `-`) then any number from 50 to 100 will trigger this message.

You may also have it where a number falls into 2 ranges, so lets say you have range `50-100` and range `69` which ever number (that `X` we spoke about earlier) is higher that is what will get outputted.

Without editing the `C#` Code the date format is not editable.
