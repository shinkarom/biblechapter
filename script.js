var counts = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22]
var languages = [
	{"lang": "English","option":"en",
	"names":["Genesis","Exodus","Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],
	"link":"https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/"}]

var mode = "cr";
var lang = 0
var book = 1
var chapter = 1

function randomInt(minn, maxn) {
	return Math.floor(Math.random()*(maxn-minn))+minn;
}

function genChapterFromRandomBook(){
	book = randomInt(0, counts.length)+1;
	chapter = randomInt(0, counts[book-1])+1;
}

function genChapterProportionally(){
	var total = 0;
	for(var i = 0;i<counts.length;i++){ total += counts[i];}
	var r = randomInt(0, total);
	for(var i = 0;i<counts.length;i++ ) {
		if(r < counts[i]){
			book = i + 1;
			chapter = r + 1;
			break;
		} else
			r -= counts[i];
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
		default:
			break;
	}
}

function onGenClick(){
	generate()
	var link = languages[lang].link;
	link += book;
	link += "/";
	link += chapter;
	document.querySelector("#link").href = link;
	var n = languages[lang].names[book-1] + " " + chapter;
	document.querySelector("#link").innerText = n;
}

function onLangsChange(){
	var e = document.querySelector("#mode")
	mode = e.options[e.selectedIndex].value;
}

function bodyLoad(){
	document.querySelector("#gen").addEventListener("click", onGenClick);
	document.querySelector("#langs").addEventListener("change", onLangsChange);
	onLangsChange();
	onGenClick();
}