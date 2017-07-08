var quotes = [
  "Nobody in football should be called a genius. A genius is a guy like Norman Einstein. – Joe Theismann",
  "I may be dumb, but I'm not stupid. – Terry Bradshaw",
  "Most football players are temperamental. That's 90% temper and 10% mental. – Doug Plank",
  "I never graduated college, but I was only there for two terms: Truman's and Eisenhower's. – Alex Karras",
  "We can't run. We can't pass. We can't stop the run. We can't stop the pass. We can't kick. Other than that, we're just not a very good football team right now. – Bruce Coslet",
  "Sure, luck means a lot in football. Not having a good quarterback is bad luck. – Don Shula",
  "I'm travelling to all 51 States to see who can stop 85. – Chad Ochocinco",
  "I feel like I'm the best, but you’re not going to get me to say that. – Jerry Rice",
  "If I drop dead tomorrow, at least I'll know I died in good health. – Bum Phillips",
  "Not only does he have the NFC East record for touchdowns, but also the team record. – Emmitt Smith",
  "If the Super Bowl is really the ultimate game, why do they play it again next year? – Duane Thomas",
  "I have 2 weapons; my arms, my legs and my brain. – Michael Vick",
  "We're going to start with the injury report, obviously. Manning, Clark, Addai, Reggie Wayne, Freeney, Mathis, Brackett — all those guys will not play. Oh, hold up. That was my wish list for Santa Claus. – Rex Ryan",
  "It isn't like I came down from Mount Sinai with the tabloids. – Ron Meyer",
  "Hey, the offensive linemen are the biggest guys on the field, they're bigger than everybody else, and that's what makes them the biggest guys on the field. – John Madden",
  "It's like my ex-wife. 21 different personalities and seven of them hated me. – Jack Rose",
  "Most of my clichés aren't original. – Chuck Knox",
  "Emotion is highly overrated in football. My wife Corky is emotional as hell but can't play football worth a damn. – John McKay",
  "The only way to stop Jim Brown was to give him a movie contract. – Spider Lockhart",
  "I've been big ever since I was little. – William 'The Refrigerator' Perry",
  "Well, we've determined that we can't win at home and we can't win on the road. What we need is a neutral site. – John Mc Kay",
  "You guys line up alphabetically by height. – Bill Peterson",
  "Julian Dicks is everywhere. It's like they've got eleven Dicks on the field. – Metro Radio",
  "He is the only man I ever saw who ran his own interference. – Steve Owen",
  "Rapport? You mean like, You'll run as fast as you can, and I'll throw it as far as I can? – Jeff Kemp",
  "You don't have to win it; just don't lose it. – Ray Lewis",
  "I'm a light eater. As soon as it's light, I start to eat – Art Donovan",
  "I'd catch a punt naked, in the snow, in Buffalo, for a chance to play in the NFL. – Steve Henderson",
  "There will always be hope for our country as long as more people watch Monday Night Football than Friends. – Michael Logsdon",
  "Detroit's so bad this year they might lose their bye week. – Dennis Miller",
  "We're as clean as any team. We wash our hands before we hit anybody. – Nate Newton",
  "I had pro offers from the Detroit Lions and Green Bay Packers, who were pretty hard up for linemen in those days. If I had gone into professional football the name Jerry Ford might have been a household word today. – President Gerald Ford",
  "People say I'll be drafted in the first round, maybe even higher. – Craig Heyward",
  "I don't Twitter, I don't MyFace, I don't Yearbook. - Bill Belichick",
  "Stats are for losers. - Bill Belichick"
]

var quote = quotes[Math.floor(Math.random()*quotes.length)];

var quoteEl = document.getElementById("quote");

quoteEl.innerText = quote;
