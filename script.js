var mode = "cr";
var lang = 0
var book = 1
var chapter = 1
var verse = 1

function randomInt(minn, maxn) {
	return Math.floor(Math.random()*(maxn-minn))+minn;
}

function selBook(){
	book = randomInt(0, chapters.length)+1;
}

function selChapterFromBook(){
	selBook();
	chapter = randomInt(0, chapters[book-1].length)+1;
}

function selChapter(){
	var r = randomInt(0, chapterTotal);
	for(var i = 0;i<chapters.length;i++) {
		if(r < chapters[i].length){
			book = i + 1;
			chapter = r + 1;
			break;
		} else
			r -= chapters[i].length;
	}
}

function selVerse(){
	var r = randomInt(0, verseTotal);
	for(var i = 0;i < chapters.length;i++) {
		for(var j = 0; j < chapters[i].length; j++) {
			if(r < chapters[i][j]){
				book = i + 1;
				chapter = j + 1;
				verse = r + 1;
				return;
			} else {
				r -= chapters[i][j];
			}
		}
	}
}

function selVerseFromBook(){
	selBook();
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

function selVerseFromChapter(){
	selChapter();
	var count = chapters[book-1][chapter-1];
	verse = randomInt(0, count)+1;
}

function select(){
	switch(mode){
		case "cb":
			selChapterFromBook();
			break;
		case "c":
			selChapter();
			break;
		case "b":
			selBook();
			break;
		case "vb":
			selVerseFromBook();
			break;
		case "vc":
			selVerseFromChapter();
			break;
		case "v":
			selVerse();
			break;
		default:
			break;
	}
}

function onSelClick(){
	select()
	var link, n
	link = "https://wol.jw.org/" + languages[lang].option + "/wol/b";
	if(mode=="b") link+="inav";
	link+=languages[lang].elink + book;
	n = languages[lang].names[book-1];	
	if(mode!="b"){
		link += "/" + chapter;		
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
	onSelClick();
}

function onLangsChange() {
	var langs = document.querySelector("#langs");
	for(var i = 0; i<languages.length;i++){
		if(languages[i].option==langs.options[langs.selectedIndex].value){
			lang = i;
			onSelClick();
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

function calculateTotals() {
	chapterTotal = 0;
	for(var i = 0;i<chapters.length;i++){ 
		chapterTotal += chapters[i].length;
	}
	
	verseTotal = 0;
	for(var i = 0;i<chapters.length;i++){ 
		for(j = 0; j<chapters[i].length; j++) {
			verseTotal += chapters[i][j];
		}
	}
}

function bodyLoad(){
	populateLangs();
	calculateTotals();
	document.querySelector("#sel").addEventListener("click", onSelClick);
	document.querySelector("#langs").addEventListener("change", onLangsChange);
	document.querySelector("#mode").addEventListener("change", onModeChange);
	onLangsChange();
	onModeChange();
}

var chapterTotal, verseTotal;
var defaultLang = "en"
var chapters = [
	[31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 
	 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 
	 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 
	 55, 32, 20, 31, 29, 43, 36, 30, 23, 22, 
	 57, 38, 34, 34, 28, 34, 31, 22, 33, 26], //Genesis
	[22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 
	 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 
	 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 
	 18, 35, 23, 35, 35, 38, 29, 31, 43, 38], //Exodus
	[17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 
	 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 
	 24, 33, 44, 23, 55, 46, 34], //Leviticus
	[54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 
	 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 
	 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 
	 54, 42, 56, 29, 34, 13], //Numbers
	[46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 
	 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 
	 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 
	 30, 52, 29, 12], //Deuteronomy
	[18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 
	 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 
	 45, 34, 16, 33], //Joshua
	[36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 
	 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 
	 25], //Judges
	[22, 23, 18, 22], //Ruth
	[28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 
	 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 
	 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 
	 13], //1 Samuel
	[27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 
	 27, 31, 39, 33, 36, 23, 29, 33, 43, 26, 
	 22, 51, 39, 25], //2 Samuel
	[53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 
	 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 
	 29, 53], //1 Kings
	[18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 
	 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 
	 26, 20, 37, 20, 30], //2 Kings
	[54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 
	 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 
	 30, 19, 32, 31, 31, 32, 34, 21, 30], //1 Chronicles
	[17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 
	 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 
	 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 
	 20, 33, 25, 33, 27, 23], //2 Chronicles
	[11, 17, 13, 24, 17, 22, 28, 36, 15, 44], //Ezra
	[11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 
	 36, 47, 31], //Nehemiah
	[22, 23, 15, 17, 14, 14, 10, 17, 32, 3], //Esther
	[22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 
	 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 
	 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 
	 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 
	 34, 17], //Job
	[6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 
	 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 
	 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 
	 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 
	 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 
	 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 
	 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 
	 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 
	 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 
	 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 
	 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 
	 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 
	 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 
	 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 
	 10, 7, 12, 15, 21, 10, 20, 14, 9, 6], //Psalms
	[33, 22, 35, 27, 23, 35, 27, 36, 17, 32, 
	 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 
	 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 
	 31], //Proverbs
	[18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 
	 10, 14], //Ecclesiastes
	[17, 17, 11, 16, 16, 13, 13, 14], //Song of Solomon
	[31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 
	 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 
	 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 
	 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 
	 29, 25, 28, 27, 25, 13, 15, 22, 26, 11, 
	 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 
	 11, 12, 19, 12, 25, 24], //Isaiah
	[19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 
	 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 
	 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 
	 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 
	 18, 22, 13, 30, 5, 28, 7, 46, 39, 46, 
	 64, 34], //Jeremiah
	[22, 22, 66, 22, 22], //Lamentations
	[28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 
	 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 
	 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 
	 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 
	 26, 20, 27, 31, 25, 24, 23, 35], //Ezekiel
	[21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 
	 45, 13], //Daniel
	[11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 
	 12, 14, 16, 9], //Hosea
	[20, 32, 21], //Joel
	[15, 16, 15, 13, 27, 14, 17, 14, 15], //Amos
	[21], //Obadiah
	[17, 10, 10, 11], //Jonah
	[16, 13, 12, 13, 15, 16, 20], //Micah
	[15, 13, 19], //Nahum
	[17, 20, 19], //Habakkuk
	[18, 15, 20], //Zephaniah
	[15, 23], //Haggai
	[20, 13, 10, 14, 11, 15, 14, 23, 17, 12, 
	 17, 14, 9, 21], //Zechariah
	[14, 17, 18, 6], //Malachi
	[25, 23, 17, 25, 48, 34, 29, 34, 37, 42, 
	 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 
	 46, 46, 39, 51, 46, 75, 66, 20], //Matthew
	[45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 
	 33, 44, 37, 72, 47, 8], //Mark
	[80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 
	 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 
	 38, 71, 56, 53], //Luke
	[51, 25, 36, 54, 47, 71, 52, 59, 41, 42, 
	 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 
	 25], //John
	[26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 
	 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 
	 40, 30, 35, 27, 27, 32, 44, 31], //Acts
	[32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 
	 36, 21, 14, 23, 33, 27], //Romans
	[31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 
	 34, 30, 13, 40, 58, 24], //1 Corinthians
	[24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 
	 33, 21, 14], //2 Corinthians
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
	[14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 
	 40, 29, 25], //Hebrews
	[27, 26, 18, 17, 20], //James
	[25, 25, 22, 19, 14], //1 Peter
	[21, 22, 18], //2 Peter
	[10, 29, 24, 21, 21], //1 John
	[13], //2 John
	[14], //3 John
	[25], //Jude
	[20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 
	 19, 17, 18, 20, 7, 21, 18, 24, 21, 15, 
	 27, 21] //Revelation
	]
var languages = [
	{
	"lang": "Bulgarian","option":"bg",
	"names": ["Битие", "Изход", "Левит", "Числа", "Второзаконие", "Исус Навиев", "Съдии", "Рут", "1 Царе", "2 Царе", "3 Царе", "4 Царе", "1 Летописи", "2 Летописи", "Ездра", "Неемия", "Естир", "Йов", "Псалми", "Притчи", "Еклисиаст", "Песен на песните", "Исаия", "Йеремия", "Плачът на Йеремия", "Езекиил", "Даниил", "Осия", "Йоил", "Амос", "Авдия", "Йона", "Михей", "Наум", "Авакум", "Софония", "Агей", "Захария", "Малахия", 
     "Матей", "Марко", "Лука", "Йоан", "Деяния", "Римляни", "1 Коринтяни", "2 Коринтяни", "Галатяни", "Ефесяни", "Филипяни", "Колосяни", "1 Солунци", "2 Солунци", "1 Тимотей", "2 Тимотей", "Тит", "Филимон", "Евреи", "Яков", "1 Петър", "2 Петър", "1 Йоан", "2 Йоан", "3 Йоан", "Юда", "Откровение"],
	"elink": "/r46/lp-bl/bi12/"
	},
	
	{
	"lang": "English","option":"en",
	"names":["Genesis","Exodus","Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
	"Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],	
	"elink":"/r1/lp-e/nwtsty/"
	},
	
	{
	"lang": "Japanese", "option":"ja",
	"names": ["創世", "出エジプト", "レビ", "民数", "申命", "ヨシュア", "裁き人", "ルツ", "サムエル第一", "サムエル第二", "列王第一", "列王第二", "歴代第一", "歴代第二", "エズラ", "ネヘミヤ", "エステル", "ヨブ", "詩編", "格言", "伝道", "ソロモンの歌", "イザヤ", "エレミヤ", "哀歌", "エゼキエル", "ダニエル", "ホセア", "ヨエル", "アモス", "オバデヤ", "ヨナ", "ミカ", "ナホム", "ハバクク", "ゼパニヤ", "ハガイ", "ゼカリヤ", "マラキ", 
    "マタイ", "マルコ", "ルカ", "ヨハネ", "使徒", "ローマ", "コリント第一", "コリント第二", "ガラテア", "エフェソス", "フィリピ", "コロサイ", "テサロニケ第一", "テサロニケ第二", "テモテ第一", "テモテ第二", "テトス", "フィレモン", "ヘブライ", "ヤコブ", "ペテロ第一", "ペテロ第二", "ヨハネ第一", "ヨハネ第二", "ヨハネ第三", "ユダ", "啓示"],
	"elink":"/r7/lp-j/nwtsty/"
	},
	
	{
	"lang":"Polish", "option":"pl",
	"names": ["Rodzaju", "Wyjścia", "Kapłańska", "Liczb", "Powtórzonego Prawa", "Jozuego", "Sędziów", "Rut", "1 Samuela", "2 Samuela", "1 Królów", "2 Królów", "1 Kronik", "2 Kronik", "Ezdrasza", "Nehemiasza", "Estery", "Hioba", "Psalmy", "Przysłów", "Kaznodziei", "Pieśń", "Izajasza", "Jeremiasza", "Lamentacje", "Ezechiela", "Daniela", "Ozeasza", "Joela", "Amosa", "Abdiasza", "Jonasza", "Micheasza", "Nahuma", "Habakuka", "Sofoniasza", "Aggeusza", "Zachariasza", "Malachiasza",
    "Mateusza", "Marka", "Łukasza", "Jana", "Dzieje", "Rzymian", "1 Koryntian", "2 Koryntian", "Galatów", "Efezjan", "Filipian", "Kolosan", "1 Tesaloniczan", "2 Tesaloniczan", "1 Tymoteusza", "2 Tymoteusza", "Tytusa", "Filemona", "Hebrajczyków", "Jakuba", "1 Piotra", "2 Piotra", "1 Jana", "2 Jana", "3 Jana", "Judy", "Objawienie"],
	"elink":"/r12/lp-p/nwtsty/"
	},
	
	{
	"lang": "Russian", "option": "ru",
	"names": ["Бытие","Исход","Левит","Числа","Второзаконие","Иисус Навин","Судей","Руфь","1 Самуила","2 Самуила","1 Царей","2 Царей","1 Летопись","2 Летопись","Ездра","Неемия","Эсфирь","Иов","Псалмы","Притчи","Экклезиаст","Песнь песней","Исаия","Иеремия","Плач Иеремии","Иезекииль","Даниил","Осия","Иоиль","Амос","Авдий","Иона","Михей","Наум","Аввакум","Софония","Аггей","Захария","Малахия",
	"Матфея","Марка","Луки","Иоанна","Деяния","Римлянам","1 Коринфянам","2 Коринфянам","Галатам","Эфесянам","Филиппийцам","Колоссянам","1 Фессалоникийцам","2 Фессалоникийцам","1 Тимофею","2 Тимофею","Титу","Филимону","Евреям","Иакова","1 Петра","2 Петра","1 Иоанна","2 Иоанна","3 Иоанна","Иуды","Откровение"],
	"elink":"/r2/lp-u/bi12/"
	},
	
	{
	"lang":"Ukrainian","option":"uk",
	"names":["Буття", "Вихід", "Левіт", "Числа", "Повторення Закону", "Ісуса Навина", "Суддів", "Рут", "1 Самуїла", "2 Самуїла", "1 Царів", "2 Царів", "1 Хронік", "2 Хронік", "Ездри", "Неемії", "Естер", "Йова", "Псалми", "Прислів’я", "Екклезіаста", "Пісня над піснями", "Ісаї", "Єремії", "Плач Єремії", "Єзекіїля", "Даниїла", "Осії", "Йоіла", "Амоса", "Овдія", "Йони", "Михея", "Наума", "Авакума", "Софонії", "Огія", "Захарія", "Малахії", 
    "Матвія", "Марка", "Луки", "Івана", "Дії", "Римлян", "1 Коринфян", "2 Коринфян", "Галатів", "Ефесян", "Філіппійців", "Колоссян", "1 Фессалонікійців", "2 Фессалонікійців", "1 Тимофія", "2 Тимофія", "Тита", "Филимона", "Євреїв", "Якова", "1 Петра", "2 Петра", "1 Івана", "2", "Івана", "3 Івана", "Юди", "Об’явлення"],
	"elink":"/r15/lp-k/nwtsty/"
	}
	]
	