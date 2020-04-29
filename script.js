var mode = "cr";
var lang = 0
var book = 1
var chapter = 1

function randomInt(minn, maxn) {
	return Math.floor(Math.random()*(maxn-minn))+minn;
}

function genBook(){
	book = randomInt(0, chapters.length)+1;
}

function genChapterFromRandomBook(){
	genBook();
	chapter = randomInt(0, chapters[book-1])+1;
}

function genChapterProportionally(){
	var total = 0;
	for(var i = 0;i<chapters.length;i++){ total += chapters[i];}
	var r = randomInt(0, total);
	for(var i = 0;i<chapters.length;i++ ) {
		if(r < chapters[i]){
			book = i + 1;
			chapter = r + 1;
			break;
		} else
			r -= chapters[i];
	}
}

function generate(){
	switch(mode){
		case "cr":
			genChapterFromRandomBook();
			break;
		case "cp":
			genChapterProportionally();
			break;
		case "b":
			genBook();
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
	}
	document.querySelector("#link").href = link;
	document.querySelector("#link").innerText = n;
}

function onModeChange(){
	var e = document.querySelector("#mode")
	mode = e.options[e.selectedIndex].value;
}

function onLangsChange() {
	var langs = document.querySelector("#langs");
	for(var i = 0; i<languages.length;i++){
		if(languages[i].option==langs.options[langs.selectedIndex].value){
			lang = i;
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
	onGenClick();
}

var defaultLang = "en"
var chapters = [
	50, //Genesis
	40, //Exodus
	27, //Leviticus
	36, //Numbers
	34, //Deuteronomy
	24, //Joshua
	21, //Judges
	4, //Ruth
	31, //1 Samuel
	24, //2 Samuel
	22, //1 Kings
	25, //2 Kings
	29, //1 Chronicles
	36, //2 Chronicles
	10, //Ezra
	13, //Nehemiah
	10, //Esther
	42, //Job
	150, //Psalms
	31, //Proverbs
	12, //Ecclesiastes
	8, //Song of Solomon
	66, //Isaiah
	52, //Jeremiah
	5, //Lamentations
	48, //Ezekiel
	12, //Daniel
	14, //Hosea
	3, //Joel
	9, //Amos
	1, //Obadiah
	4, //Jonah
	7, //Micah
	3, //Nahum
	3, //Habakkuk
	3, //Zephaniah
	2, //Haggai
	14, //Zechariah
	4, //Malachi
	28, //Matthew
	16, //Mark
	24, //Luke
	21, //John
	28, //Acts
	16, //Romans
	16, //1 Corinthians
	13, //2 Corinthians
	6, //Galatians
	6, //Ephesians
	4, //Philippians
	4, //Colossians
	5, //1 Thessalonians
	3, //2 Thessalonians
	6, //1 Timothy
	4, //2 Timothy
	3, //Titus
	1, //Philemon
	13, //Hebrews
	5, //James
	5, //1 Peter
	3, //2 Peter
	5, //1 John
	1, //2 John
	1, //3 John
	1, //Jude
	22 //Revelation
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
	