var mode = "cr";
var lang = 0
var book = 1
var chapter = 1
var verse = 1

function randomInt(minn, maxn) {
	return Math.floor(Math.random()*(maxn-minn))+minn;
}

function genBook(){
	book = randomInt(0, chapters.length)+1;
}

function genChapterFromBook(){
	genBook();
	chapter = randomInt(0, chapters[book-1].length)+1;
}

function genChapter(){
	var total = 0;
	for(var i = 0;i<chapters.length;i++){ total += chapters[i].length;}
	var r = randomInt(0, total);
	for(var i = 0;i<chapters.length;i++ ) {
		if(r < chapters[i].length){
			book = i + 1;
			chapter = r + 1;
			break;
		} else
			r -= chapters[i].length;
	}
}

function genVerse(){
	
}

function genVerseFromBook(){
	genBook();
	var total = 0;
	for(var i = 0;i<chapters[book-1].length;i++){ total += chapters[book-1][i];}
	var r = randomInt(0, total);
	for(var i = 0;i<chapters[book-1].length;i++ ) {
		if(r < chapters[book-1][i]){
			chapter = i + 1;
			verse = r + 1;
			break;
		} else
			r -= chapters[book-1][i];
	}	
}

function genVerseFromChapter(){
	genChapter();
	var count = chapters[book-1][chapter-1];
	verse = randomInt(0, count)+1;
}

function generate(){
	switch(mode){
		case "cb":
			genChapterFromBook();
			break;
		case "c":
			genChapter();
			break;
		case "b":
			genBook();
			break;
		case "vb":
			genVerseFromBook();
			break;
		case "vc":
			genVerseFromChapter();
			break;
		case "v":
			genVerse();
			break;
		default:
			break;
	}
}

function onGenClick(){
	generate()
	var link, n
	if(mode=="b"){
		link = languages[lang].blink;
		link += book;
		n = languages[lang].names[book-1];		
	} else {
		link = languages[lang].clink;
		link += book;
		n = languages[lang].names[book-1];
		link += "/";
		link += chapter;		
		n += " " + chapter;		
		if((mode=="v")||(mode=="vb")||(mode=="vc")){
			link += "#v=" + book + ":" + chapter + ":" + verse;
			n += ":" + verse;
		}
	}
	document.querySelector("#link").href = link;
	document.querySelector("#link").innerText = n;
}

function onModeChange(){
	var e = document.querySelector("#mode")
	mode = e.options[e.selectedIndex].value;
	onGenClick();
}

function onLangsChange() {
	var langs = document.querySelector("#langs");
	for(var i = 0; i<languages.length;i++){
		if(languages[i].option==langs.options[langs.selectedIndex].value){
			lang = i;
			onGenClick();
			return;
		}
	}
}

function populateLangs(){
	var langs = document.querySelector("#langs");
	langs.textContent = '';
	for(var i = 0; i<languages.length;i++){
		var item = document.createElement("option");
		item.text = languages[i].lang;
		item.value = languages[i].option;
		item.selected = languages[i].option == defaultLang;
		langs.add(item);
	}
}

function bodyLoad(){
	populateLangs();
	document.querySelector("#gen").addEventListener("click", onGenClick);
	document.querySelector("#langs").addEventListener("change", onLangsChange);
	document.querySelector("#mode").addEventListener("change", onModeChange);
	onLangsChange();
	onModeChange();
}

var defaultLang = "en"
var chapters = [
	[50], //Genesis
	[40], //Exodus
	[27], //Leviticus
	[36], //Numbers
	[34], //Deuteronomy
	[24], //Joshua
	[21], //Judges
	[22, 23, 18, 22], //Ruth
	[31], //1 Samuel
	[24], //2 Samuel
	[22], //1 Kings
	[25], //2 Kings
	[29], //1 Chronicles
	[36], //2 Chronicles
	[10], //Ezra
	[13], //Nehemiah
	[10], //Esther
	[42], //Job
	[150], //Psalms
	[31], //Proverbs
	[12], //Ecclesiastes
	[17, 17, 11, 16, 16, 13, 13, 14], //Song of Solomon
	[66], //Isaiah
	[52], //Jeremiah
	[22, 22, 66, 22, 22], //Lamentations
	[48], //Ezekiel
	[12], //Daniel
	[14], //Hosea
	[20, 32, 21], //Joel
	[15, 16, 15, 13, 27, 14, 17, 14, 15], //Amos
	[21], //Obadiah
	[17, 10, 10, 11], //Jonah
	[16, 13, 12, 13, 15, 16, 20], //Micah
	[15, 13, 19], //Nahum
	[17, 20, 19], //Habakkuk
	[18, 15, 20], //Zephaniah
	[15, 23], //Haggai
	[14], //Zechariah
	[14, 17, 18, 6], //Malachi
	[28], //Matthew
	[16], //Mark
	[24], //Luke
	[21], //John
	[28], //Acts
	[16], //Romans
	[16], //1 Corinthians
	[13], //2 Corinthians
	[24, 21, 29, 31, 26, 18], //Galatians
	[23, 22, 21, 31, 33, 24], //Ephesians
	[30, 30, 21, 23], //Philippians
	[29, 23, 25, 18], //Colossians
	[10, 20, 13, 18, 28], //1 Thessalonians
	[12, 17, 18], //2 Thessalonians
	[20, 15, 16, 16, 25, 21], //1 Timothy
	[18, 26, 17, 22], //2 Timothy
	[16, 15, 15], //Titus
	[25], //Philemon
	[13], //Hebrews
	[27, 26, 18, 17, 20], //James
	[25, 25, 22, 19, 14], //1 Peter
	[21, 22, 18], //2 Peter
	[10, 29, 24, 21, 21], //1 John
	[13], //2 John
	[14], //3 John
	[25], //Jude
	[22] //Revelation
	]
var languages = [
	{"lang": "English","option":"en",
	"names":["Genesis","Exodus","Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
	"Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],	
	"blink":"https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty/","clink":"https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/"},
	
	{"lang": "Russian", "option": "ru",
	"names": ["Бытие","Исход","Левит","Числа","Второзаконие","Иисус Навин","Судей","Руфь","1 Самуила","2 Самуила","1 Царей","2 Царей","1 Летопись","2 Летопись","Ездра","Неемия","Эсфирь","Иов","Псалмы","Притчи","Экклезиаст","Песнь песней","Исаия","Иеремия","Плач Иеремии","Иезекииль","Даниил","Осия","Иоиль","Амос","Авдий","Иона","Михей","Наум","Аввакум","Софония","Аггей","Захария","Малахия",
	"Матфея","Марка","Луки","Иоанна","Деяния","Римлянам","1 Коринфянам","2 Коринфянам","Галатам","Эфесянам","Филиппийцам","Колоссянам","1 Фессалоникийцам","2 Фессалоникийцам","1 Тимофею","2 Тимофею","Титу","Филимону","Евреям","Иакова","1 Петра","2 Петра","1 Иоанна","2 Иоанна","3 Иоанна","Иуды","Откровение"],
	"blink":"https://wol.jw.org/ru/wol/binav/r2/lp-u/bi12/","clink": "https://wol.jw.org/ru/wol/b/r2/lp-u/bi12/"},
	]
	