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

function selVerseFromChapterOfBook(){
	selChapterFromBook();
	verse = randomInt(1, chapters[book-1][chapter-1]);
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
		case "vr":
			selVerseFromChapterOfBook();
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
	link+="/" + languages[lang].elink + "/" + book;
	n = languages[lang].names[book-1];	
	if(mode!="b"){
		link += "/" + chapter;		
		n += " " + chapter;		
		if((mode=="v")||(mode=="vb")||(mode=="vc")||(mode=="vr")){
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
	
	/*
	{
	"lang": "", "option": "",
	"names": [],
	"elink": ""
	},	
	*/
	
var languages = [
	
	{
	"lang": "Afrikaans", "option": "af",
	"names": ["Genesis", "Eksodus", "Levitikus", "Numeri", "Deuteronomium", "Josua", "Rigters", "Rut", "1 Samuel", "2 Samuel", "1 Konings", "2 Konings", "1 Kronieke", "2 Kronieke", "Esra", "Nehemia", "Ester", "Job", "Psalms", "Spreuke", "Prediker", "Hooglied van Salomo", "Jesaja", "Jeremia", "Klaagliedere", "Esegiël", "Daniël", "Hosea", "Joël", "Amos", "Obadja", "Jona", "Miga", "Nahum", "Habakuk", "Sefanja", "Haggai", "Sagaria", "Maleagi", 
	"Matteus", "Markus", "Lukas", "Johannes", "Handelinge", "Romeine", "1 Korintiërs", "2 Korintiërs", "Galasiërs", "Efesiërs", "Filippense", "Kolossense", "1 Tessalonisense", "2 Tessalonisense", "1 Timoteus", "2 Timoteus", "Titus", "Filemon", "Hebreërs", "Jakobus", "1 Petrus", "2 Petrus", "1 Johannes", "2 Johannes", "3 Johannes", "Judas", "Openbaring"],
	"elink": "r52/lp-af/nwt"
	},	
	
	{
	"lang": "Bulgarian","option":"bg",
	"names": ["Битие", "Изход", "Левит", "Числа", "Второзаконие", "Исус Навиев", "Съдии", "Рут", "1 Царе", "2 Царе", "3 Царе", "4 Царе", "1 Летописи", "2 Летописи", "Ездра", "Неемия", "Естир", "Йов", "Псалми", "Притчи", "Еклисиаст", "Песен на песните", "Исаия", "Йеремия", "Плачът на Йеремия", "Езекиил", "Даниил", "Осия", "Йоил", "Амос", "Авдия", "Йона", "Михей", "Наум", "Авакум", "Софония", "Агей", "Захария", "Малахия", 
     "Матей", "Марко", "Лука", "Йоан", "Деяния", "Римляни", "1 Коринтяни", "2 Коринтяни", "Галатяни", "Ефесяни", "Филипяни", "Колосяни", "1 Солунци", "2 Солунци", "1 Тимотей", "2 Тимотей", "Тит", "Филимон", "Евреи", "Яков", "1 Петър", "2 Петър", "1 Йоан", "2 Йоан", "3 Йоан", "Юда", "Откровение"],
	"elink": "r46/lp-bl/bi12"
	},
	
	{
	"lang": "Czech", "option":"cs",
	"names": ["1. Mojžíšova", "2. Mojžíšova", "3. Mojžíšova", "4. Mojžíšova", "5. Mojžíšova", "Jozue", "Soudci", "Rut", "1. Samuelova", "2. Samuelova", "1. Královská", "2. Královská", "1. Paralipomenon", "2. Paralipomenon", "Ezra", "Nehemjáš", "Ester", "Job", "Žalmy", "Přísloví", "Kazatel", "Šalomounova píseň", "Izajáš", "Jeremjáš", "Nářky", "Ezekiel", "Daniel", "Ozeáš", "Joel", "Amos", "Obadjáš", "Jonáš", "Micheáš", "Nahum", "Habakuk", "Sefanjáš", "Ageus", "Zecharjáš", "Malachiáš",
	"Matouš", "Marek", "Lukáš", "Jan", "Skutky", "Římanům", "1. Korinťanům", "2. Korinťanům", "Galaťanům", "Efezanům", "Filipanům", "Kolosanům", "1. Tesaloničanům", "2. Tesaloničanům", "1. Timoteovi", "2. Timoteovi", "Titovi", "Filemonovi", "Hebrejcům", "Jakub", "1. Petra", "2. Petra", "1. Jana", "2. Jana", "3. Jana", "Juda", "Zjevení"],
	"elink": "r29/lp-b/nwt"
	},
	
	{
	"lang": "Chinese (Simplified)", "option": "cmn-Hans",
	"names": ["创世记", "出埃及记", "利未记", "民数记", "申命记", "约书亚记", "士师记", "路得记", "撒母耳记上", "撒母耳记下", "列王纪上", "列王纪下", "历代志上", "历代志下", "以斯拉记", "尼希米记", "以斯帖记", "约伯记", "诗篇", "箴言", "传道书", "雅歌", "以赛亚书", "耶利米书", "耶利米哀歌", "以西结书", "但以理书", "何西阿书", "约珥书", "阿摩司书", "俄巴底亚书", "约拿书", "弥迦书", "那鸿书", "哈巴谷书", "西番雅书", "哈该书", "撒迦利亚书", "玛拉基书", 
	"马太福音", "马可福音", "路加福音", "约翰福音", "使徒行传", "罗马书", "哥林多前书", "哥林多后书", "加拉太书", "以弗所书", "腓立比书", "歌罗西书", "帖撒罗尼迦前书", "帖撒罗尼迦后书", "提摩太前书", "提摩太后书", "提多书", "腓利门书", "希伯来书", "雅各书", "彼得前书", "彼得后书", "约翰一书", "约翰二书", "约翰三书", "犹大书", "启示录"],
	"elink": "r23/lp-chs/nwt"
	},	

	{
	"lang": "Chinese (Traditional)", "option": "cmn-Hant",
	"names": ["創世記", "出埃及記", "利未記", "民數記", "申命記", "約書亞記", "士師記", "路得記", "撒母耳記上", "撒母耳記下", "列王紀上", "列王紀下", "歷代志上", "歷代志下", "以斯拉記", "尼希米記", "以斯帖記", "約伯記", "詩篇", "箴言", "傳道書", "雅歌", "以賽亞書", "耶利米書", "耶利米哀歌", "以西結書", "但以理書", "何西阿書", "約珥書", "阿摩司書", "俄巴底亞書", "約拿書", "彌迦書", "那鴻書", "哈巴谷書", "西番雅書", "哈該書", "撒迦利亞書", "瑪拉基書", 
	"馬太福音", "馬可福音", "路加福音", "約翰福音", "使徒行傳", "羅馬書", "哥林多前書", "哥林多後書", "加拉太書", "以弗所書", "腓立比書", "歌羅西書", "帖撒羅尼迦前書", "帖撒羅尼迦後書", "提摩太前書", "提摩太後書", "提多書", "腓利門書", "希伯來書", "雅各書", "彼得前書", "彼得後書", "約翰一書", "約翰二書", "約翰三書", "猶大書", "啟示錄"],
	"elink": "r24/lp-ch/nwt"
	},		
	
	{
	"lang": "Danish", "option": "da",
	"names": ["1. Mosebog", "2. Mosebog", "3. Mosebog", "4. Mosebog", "5. Mosebog", "Josva", "Dommerne", "Ruth", "1. Samuel", "2. Samuel", "1. Kongebog", "2. Kongebog", "1. Krønikebog", "2. Krønikebog", "Ezra", "Nehemias", "Ester", "Job", "Salmerne", "Ordsprogene", "Prædikeren", "Højsangen", "Esajas", "Jeremias", "Klagesangene", "Ezekiel", "Daniel", "Hoseas", "Joel", "Amos", "Obadias", "Jonas", "Mika", "Nahum", "Habakkuk", "Sefanias", "Haggaj", "Zakarias", "Malakias", 
	"Matthæus", "Markus", "Lukas", "Johannes", "Apostlenes Gerninger", "Romerne", "1. Korinther", "2. Korinther", "Galaterne", "Efeserne", "Filipperne", "Kolossenserne", "1. Thessaloniker", "2. Thessaloniker", "1. Timotheus", "2. Timotheus", "Titus", "Filemon", "Hebræerne", "Jakob", "1. Peter", "2. Peter", "1. Johannes", "2. Johannes", "3. Johannes", "Judas", "Åbenbaringen", ],
	"elink": "r9/lp-d/nwtsty"
	},
	
	{
	"lang": "Dutch", "option": "nl",
	"names": ["Genesis", "Exodus", "Leviticus", "Numeri", "Deuteronomium", "Jozua", "Rechters", "Ruth", "1 Samuël", "2 Samuël", "1 Koningen", "2 Koningen", "1 Kronieken", "2 Kronieken", "Ezra", "Nehemia", "Esther", "Job", "Psalmen", "Spreuken", "Prediker", "Hooglied", "Jesaja", "Jeremia", "Klaagliederen", "Ezechiël", "Daniël", "Hosea", "Joël", "Amos", "Obadja", "Jona", "Micha", "Nahum", "Habakuk", "Zefanja", "Haggaï", "Zacharia", "Maleachi", 
	"Mattheüs", "Markus", "Lukas", "Johannes", "Handelingen", "Romeinen", "1 Korinthiërs", "2 Korinthiërs", "Galaten", "Efeziërs", "Filippenzen", "Kolossenzen", "1 Thessalonicenzen", "2 Thessalonicenzen", "1 Timotheüs", "2 Timotheüs", "Titus", "Filemon", "Hebreeën", "Jakobus", "1 Petrus", "2 Petrus", "1 Johannes", "2 Johannes", "3 Johannes", "Judas", "Openbaring"],
	"elink": "r18/lp-o/nwtsty"
	},	
	
	{
	"lang": "English","option":"en",
	"names":["Genesis","Exodus","Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
	"Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],	
	"elink":"r1/lp-e/nwtsty"
	},
	
	{
	"lang": "French", "option": "fr",
	"names": ["Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges", "Ruth", "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie", "Esther", "Job", "Psaumes", "Proverbes", "Ecclésiaste", "Chant de Salomon", "Isaïe", "Jérémie", "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie", 
	"Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates", "Éphésiens", "Philippiens", "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Révélation"],
	"elink": "r30/lp-f/nwtsty"
	},
	
	{
	"lang": "German", "option": "de",
	"names": ["1. Mose", "2. Mose", "3. Mose", "4. Mose", "5. Mose", "Josua", "Richter", "Ruth", "1. Samuel", "2. Samuel", "1. Könige", "2. Könige", "1. Chronika", "2. Chronika", "Esra", "Nehemia", "Esther", "Hiob", "Psalmen", "Sprüche", "Prediger", "Hohes Lied", "Jesaja", "Jeremia", "Klagelieder", "Hesekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadja", "Jona", "Micha", "Nahum", "Habakuk", "Zephanja", "Haggai", "Sacharja", "Maleachi", 
	"Matthäus", "Markus", "Lukas", "Johannes", "Apostelgeschichte", "Römer", "1. Korinther", "2. Korinther", "Galater", "Epheser", "Philipper", "Kolosser", "1. Thessalonicher", "2. Thessalonicher", "1. Timotheus", "2. Timotheus", "Titus", "Philemon", "Hebräer", "Jakobus", "1. Petrus", "2. Petrus", "1. Johannes", "2. Johannes", "3. Johannes", "Judas", "Offenbarung"],
	"elink": "r10/lp-x/nwtsty"
	},
	
	{
	"lang": "Indonesian", "option": "id",
	"names": ["Kejadian", "Keluaran", "Imamat", "Bilangan", "Ulangan", "Yosua", "Hakim", "Rut", "1 Samuel", "2 Samuel", "1 Raja", "2 Raja", "1 Tawarikh", "2 Tawarikh", "Ezra", "Nehemia", "Ester", "Ayub", "Mazmur", "Amsal", "Pengkhotbah", "Kidung Agung", "Yesaya", "Yeremia", "Ratapan", "Yehezkiel", "Daniel", "Hosea", "Yoel", "Amos", "Obaja", "Yunus", "Mikha", "Nahum", "Habakuk", "Zefanya", "Hagai", "Zakharia", "Maleakhi",
	"Matius", "Markus", "Lukas", "Yohanes", "Kisah", "Roma", "1 Korintus", "2 Korintus", "Galatia", "Efesus", "Filipi", "Kolose", "1 Tesalonika", "2 Tesalonika", "1 Timotius", "2 Timotius", "Titus", "Filemon", "Ibrani", "Yakobus", "1 Petrus", "2 Petrus", "1 Yohanes", "2 Yohanes", "3 Yohanes", "Yudas", "Wahyu"],
	"elink": "r25/lp-in/nwtsty"
	},	
	
	{
	"lang": "Italian", "option": "it",
	"names": ["Genesi", "Esodo", "Levitico", "Numeri", "Deuteronomio", "Giosuè", "Giudici", "Rut", "1 Samuele", "2 Samuele", "1 Re", "2 Re", "1 Cronache", "2 Cronache", "Esdra", "Neemia", "Ester", "Giobbe", "Salmi", "Proverbi", "Ecclesiaste", "Cantico", "dei Cantici", "Isaia", "Geremia", "Lamentazioni", "Ezechiele", "Daniele", "Osea", "Gioele", "Amos", "Abdia", "Giona", "Michea", "Naum", "Abacuc", "Sofonia", "Aggeo", "Zaccaria", "Malachia", 
	"Matteo", "Marco", "Luca", "Giovanni", "Atti", "Romani", "1 Corinti", "2 Corinti", "Galati", "Efesini", "Filippesi", "Colossesi", "1 Tessalonicesi", "2 Tessalonicesi", "1 Timoteo", "2 Timoteo", "Tito", "Filemone", "Ebrei", "Giacomo", "1 Pietro", "2 Pietro", "1 Giovanni", "2 Giovanni", "3", "Giovanni", "Giuda", "Rivelazione",],
	"elink": "r6/lp-i/nwtsty"
	},
	
	{
	"lang": "Japanese", "option":"ja",
	"names": ["創世", "出エジプト", "レビ", "民数", "申命", "ヨシュア", "裁き人", "ルツ", "サムエル第一", "サムエル第二", "列王第一", "列王第二", "歴代第一", "歴代第二", "エズラ", "ネヘミヤ", "エステル", "ヨブ", "詩編", "格言", "伝道", "ソロモンの歌", "イザヤ", "エレミヤ", "哀歌", "エゼキエル", "ダニエル", "ホセア", "ヨエル", "アモス", "オバデヤ", "ヨナ", "ミカ", "ナホム", "ハバクク", "ゼパニヤ", "ハガイ", "ゼカリヤ", "マラキ", 
    "マタイ", "マルコ", "ルカ", "ヨハネ", "使徒", "ローマ", "コリント第一", "コリント第二", "ガラテア", "エフェソス", "フィリピ", "コロサイ", "テサロニケ第一", "テサロニケ第二", "テモテ第一", "テモテ第二", "テトス", "フィレモン", "ヘブライ", "ヤコブ", "ペテロ第一", "ペテロ第二", "ヨハネ第一", "ヨハネ第二", "ヨハネ第三", "ユダ", "啓示"],
	"elink":"r7/lp-j/nwtsty"
	},
	
	{
	"lang": "Korean", "option": "ko",
	"names": ["창세기", "출애굽기", "레위기", "민수기", "신명기", "여호수아", "사사기", "룻기", "사무엘상", "사무엘하", "열왕기상", "열왕기하", "역대기상", "역대기하", "에스라", "느헤미야", "에스더", "욥기", "시편", "잠언", "전도서", "솔로몬의 노래", "이사야", "예레미야", "예레미야 애가", "에스겔", "다니엘", "호세아", "요엘", "아모스", "오바댜", "요나", "미가", "나훔", "하박국", "스바냐", "학개", "스가랴", "말라기", 
	"마태복음", "마가복음", "누가복음", "요한복음", "사도행전", "로마서", "고린도 전서", "고린도 후서", "갈라디아서", "에베소서", "빌립보서", "골로새서", "데살로니가 전서", "데살로니가 후서", "디모데 전서", "디모데 후서", "디도서", "빌레몬서", "히브리서", "야고보서", "베드로 전서", "베드로 후서", "요한 1서", "요한 2서", "요한 3서", "유다서", "요한 계시록"],
	"elink": "r8/lp-ko/nwtsty"
	},	
	
	{
	"lang": "Malay", "option": "ms",
	"names": ["Kejadian", "Keluaran", "Imamat", "Bilangan", "Ulangan", "Yosua", "Hakim-Hakim", "Rut", "1 Samuel", "2 Samuel", "1 Raja-Raja", "2 Raja-Raja", "1 Tawarikh", "2 Tawarikh", "Ezra", "Nehemia", "Ester", "Ayub", "Mazmur", "Amsal", "Pengkhutbah", "Kidung Agung", "Yesaya", "Yeremia", "Ratapan", "Yehezkiel", "Daniel", "Hosea", "Yoel", "Amos", "Obaja", "Yunus", "Mikha", "Nahum", "Habakuk", "Zefanya", "Hagai", "Zakharia", "Maleakhi", 
	"Matius", "Markus", "Lukas", "Yohanes", "Kisah", "Roma", "1 Korintus", "2 Korintus", "Galatia", "Efesus", "Filipi", "Kolose", "1 Tesalonika", "2 Tesalonika", "1 Timotius", "2 Timotius", "Titus", "Filemon", "Ibrani", "Yakobus", "1 Petrus", "2 Petrus", "1 Yohanes", "2 Yohanes", "3 Yohanes", "Yudas", "Wahyu"],
	"elink": "r118/lp-ml/nwt"
	},	
	
	{
	"lang": "Norwegian", "option": "no",
	"names": ["1. Mosebok", "2. Mosebok", "3. Mosebok", "4. Mosebok", "5. Mosebok", "Josva", "Dommerne", "Rut", "1. Samuelsbok", "2. Samuelsbok", "1. Kongebok", "2. Kongebok", "1. Krønikebok", "2. Krønikebok", "Esra", "Nehemja", "Ester", "Job", "Salmene", "Ordspråkene", "Forkynneren", "Høysangen", "Jesaja", "Jeremia", "Klagesangene", "Esekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadja", "Jona", "Mika", "Nahum", "Habakkuk", "Sefanja", "Haggai", "Sakarja", "Malaki", 
	"Matteus", "Markus", "Lukas", "Johannes", "Apostlenes gjerninger", "Romerne", "1. Korinter", "2. Korinter", "Galaterne", "Efeserne", "Filipperne", "Kolosserne", "1. Tessaloniker", "2. Tessaloniker", "1. Timoteus", "2. Timoteus", "Titus", "Filemon", "Hebreerne", "Jakob", "1. Peter", "2. Peter", "1. Johannes", "2. Johannes", "3. Johannes", "Judas", "Åpenbaringen", ],
	"elink": "r3/lp-n/nwtsty"
	},	
	
	{
	"lang":"Polish", "option":"pl",
	"names": ["Rodzaju", "Wyjścia", "Kapłańska", "Liczb", "Powtórzonego Prawa", "Jozuego", "Sędziów", "Rut", "1 Samuela", "2 Samuela", "1 Królów", "2 Królów", "1 Kronik", "2 Kronik", "Ezdrasza", "Nehemiasza", "Estery", "Hioba", "Psalmy", "Przysłów", "Kaznodziei", "Pieśń", "Izajasza", "Jeremiasza", "Lamentacje", "Ezechiela", "Daniela", "Ozeasza", "Joela", "Amosa", "Abdiasza", "Jonasza", "Micheasza", "Nahuma", "Habakuka", "Sofoniasza", "Aggeusza", "Zachariasza", "Malachiasza",
    "Mateusza", "Marka", "Łukasza", "Jana", "Dzieje", "Rzymian", "1 Koryntian", "2 Koryntian", "Galatów", "Efezjan", "Filipian", "Kolosan", "1 Tesaloniczan", "2 Tesaloniczan", "1 Tymoteusza", "2 Tymoteusza", "Tytusa", "Filemona", "Hebrajczyków", "Jakuba", "1 Piotra", "2 Piotra", "1 Jana", "2 Jana", "3 Jana", "Judy", "Objawienie"],
	"elink":"r12/lp-p/nwtsty"
	},
	
	{
	"lang": "Portuguese", "option": "pt",
	"names": ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester", "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cântico de Salomão", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oseias", "Joel", "Amós", "Obadias", "Jonas", "Miqueias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias", 
	"Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filêmon", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2", "João", "3 João", "Judas", "Apocalipse"],
	"elink": "r5/lp-t/nwtsty"
	},	
	
	{
	"lang": "Russian", "option": "ru",
	"names": ["Бытие","Исход","Левит","Числа","Второзаконие","Иисус Навин","Судей","Руфь","1 Самуила","2 Самуила","1 Царей","2 Царей","1 Летопись","2 Летопись","Ездра","Неемия","Эсфирь","Иов","Псалмы","Притчи","Экклезиаст","Песнь песней","Исаия","Иеремия","Плач Иеремии","Иезекииль","Даниил","Осия","Иоиль","Амос","Авдий","Иона","Михей","Наум","Аввакум","Софония","Аггей","Захария","Малахия",
	"Матфея","Марка","Луки","Иоанна","Деяния","Римлянам","1 Коринфянам","2 Коринфянам","Галатам","Эфесянам","Филиппийцам","Колоссянам","1 Фессалоникийцам","2 Фессалоникийцам","1 Тимофею","2 Тимофею","Титу","Филимону","Евреям","Иакова","1 Петра","2 Петра","1 Иоанна","2 Иоанна","3 Иоанна","Иуды","Откровение"],
	"elink":"r2/lp-u/bi12"
	},
	
	{
	"lang": "Slovak", "option": "sk",
	"names": ["1. Mojžišova", "2. Mojžišova", "3. Mojžišova", "4. Mojžišova", "5. Mojžišova", "Jozua", "Sudcovia", "Rút", "1. Samuelova", "2. Samuelova", "1. Kráľov", "2. Kráľov", "1. Kroník", "2. Kroník", "Ezdráš", "Nehemiáš", "Ester", "Jób", "Kniha žalmov", "Príslovia", "Kazateľ", "Šalamúnova pieseň", "Izaiáš", "Jeremiáš", "Plač Jeremiáša", "Ezechiel", "Daniel", "Ozeáš", "Joel", "Amos", "Abdiáš", "Jonáš", "Micheáš", "Náhum", "Habakuk", "Sofoniáš", "Aggeus", "Zachariáš", "Malachiáš", 
	"Matúš", "Marek", "Lukáš", "Ján", "Skutky", "Rimanom", "1. Korinťanom", "2. Korinťanom", "Galaťanom", "Efezanom", "Filipanom", "Kolosanom", "1. Tesaloničanom", "2. Tesaloničanom", "1. Timotejovi", "2. Timotejovi", "Títovi", "Filemonovi", "Hebrejom", "Jakub", "1. Petra", "2. Petra", "1. Jána", "2. Jána", "3. Jána", "Júda", "Zjavenie"],
	"elink": "r38/lp-v/nwt"
	},
	
	{
	"lang": "Slovene", "option": "sl",
	"names": ["1. Mojzesova", "2. Mojzesova", "3. Mojzesova", "4. Mojzesova", "5. Mojzesova", "Jozue", "Sodniki", "Ruta", "1. Samuelova", "2. Samuelova", "1. kraljev", "2. kraljev", "1. kroniška", "2. kroniška", "Ezra", "Nehemija", "Estera", "Job", "Psalmi", "Pregovori", "Pridigar", "Visoka pesem", "Izaija", "Jeremija", "Žalostinke", "Ezekiel", "Daniel", "Ozej", "Joel", "Amos", "Obadija", "Jona", "Miha", "Nahum", "Habakuk", "Zefanija", "Hagaj", "Zaharija", "Malahija", 
	"Matej", "Marko", "Luka", "Janez", "Apostolska dela", "Rimljanom", "1. Korinčanom", "2. Korinčanom", "Galačanom", "Efežanom", "Filipljanom", "Kološanom", "1. Tesaloničanom", "2. Tesaloničanom", "1. Timoteju", "2. Timoteju", "Titu", "Filemonu", "Hebrejcem", "Jakob", "1. Petrovo", "2. Petrovo", "1. Janezovo", "2. Janezovo", "3. Janezovo", "Juda", "Razodetje"],
	"elink": "r64/lp-sv/bi12"
	},
	
	{
	"lang": "Spanish", "option": "es",
	"names": ["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras", "Nehemías", "Ester", "Job", "Salmos", "Proverbios", "Eclesiastés", "El", "Cantar de los Cantares", "Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Ageo", "Zacarías", "Malaquías",
	"Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses", "1", "Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "1 Pedro", "2", "Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"],
	"elink": "r4/lp-s/nwt"
	},
	
	{
	"lang": "Swahili", "option": "sw",
	"names": ["Mwanzo", "Kutoka", "Mambo ya Walawi", "Hesabu", "Kumbukumbu la Torati", "Yoshua", "Waamuzi", "Ruthu", "1 Samweli", "2 Samweli", "1 Wafalme", "2 Wafalme", "1 Mambo ya Nyakati", "2 Mambo ya Nyakati", "Ezra", "Nehemia", "Esta", "Ayubu", "Zaburi", "Methali", "Mhubiri", "Wimbo wa Sulemani", "Isaya", "Yeremia", "Maombolezo", "Ezekieli", "Danieli", "Hosea", "Yoeli", "Amosi", "Obadia", "Yona", "Mika", "Nahumu", "Habakuki", "Sefania", "Hagai", "Zekaria", "Malaki",
	"Mathayo", "Marko", "Luka", "Yohana", "Matendo", "Waroma", "1 Wakorintho", "2 Wakorintho", "Wagalatia", "Waefeso", "Wafilipi", "Wakolosai", "1 Wathesalonike", "2 Wathesalonike", "1 Timotheo", "2 Timotheo", "Tito", "Filemoni", "Waebrania", "Yakobo", "1 Petro", "2 Petro", "1 Yohana", "2 Yohana", "3 Yohana", "Yuda",  "Ufunuo"],
	"elink": "r13/lp-sw/nwt"
	},	
	
	{
	"lang": "Swedish", "option": "sv",
	"names": ["1 Moseboken", "2 Moseboken", "3 Moseboken", "4 Moseboken", "5 Moseboken", "Josua", "Domarboken", "Rut", "1 Samuelsboken", "2 Samuelsboken", "1 Kungaboken", "2 Kungaboken", "1 Krönikeboken", "2 Krönikeboken", "Esra", "Nehemja", "Ester", "Job", "Psalmerna", "Ordspråksboken", "Predikaren", "Höga visan", "Jesaja", "Jeremia", "Klagovisorna", "Hesekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadja", "Jona", "Mika", "Nahum", "Habackuk", "Sefanja", "Haggaj", "Sakarja", "Malaki", 
	"Matteus", "Markus", "Lukas", "Johannes", "Apostlagärningarna", "Romarna", "1 Korinthierna", "2 Korinthierna", "Galaterna", "Efesierna", "Filipperna", "Kolosserna", "1 Thessalonikerna", "2 Thessalonikerna", "1 Timoteus", "2 Timoteus", "Titus", "Filemon", "Hebréerna", "Jakob", "1 Petrus", "2 Petrus", "1 Johannes", "2 Johannes", "3 Johannes", "Judas", "Uppenbarelsebok",],
	"elink": "r14/lp-z/nwtsty"
	},
	
	{
	"lang":"Ukrainian","option":"uk",
	"names":["Буття", "Вихід", "Левіт", "Числа", "Повторення Закону", "Ісуса Навина", "Суддів", "Рут", "1 Самуїла", "2 Самуїла", "1 Царів", "2 Царів", "1 Хронік", "2 Хронік", "Ездри", "Неемії", "Естер", "Йова", "Псалми", "Прислів’я", "Екклезіаста", "Пісня над піснями", "Ісаї", "Єремії", "Плач Єремії", "Єзекіїля", "Даниїла", "Осії", "Йоіла", "Амоса", "Овдія", "Йони", "Михея", "Наума", "Авакума", "Софонії", "Огія", "Захарія", "Малахії", 
    "Матвія", "Марка", "Луки", "Івана", "Дії", "Римлян", "1 Коринфян", "2 Коринфян", "Галатів", "Ефесян", "Філіппійців", "Колоссян", "1 Фессалонікійців", "2 Фессалонікійців", "1 Тимофія", "2 Тимофія", "Тита", "Филимона", "Євреїв", "Якова", "1 Петра", "2 Петра", "1 Івана", "2", "Івана", "3 Івана", "Юди", "Об’явлення"],
	"elink":"r15/lp-k/nwtsty"
	}
	]
	