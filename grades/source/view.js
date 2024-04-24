function getQueryString(name) {
	var query_string = window.location.search;
	if (!query_string) return '';
	var re = /[?&]?([^=]+)=([^&]*)/g;
	var tokens;
	while (tokens = re.exec(query_string))
		if (decodeURIComponent(tokens[1]) === name)
			return decodeURIComponent(tokens[2]);
	return '';
}
function loadData(){
	var search_text = getQueryString("search");
	var grade_option = getQueryString("grade");
	var category_option = getQueryString("category");
	category_option = (category_option == '' ? 'a' : category_option);
	var search_all = category_option == 'a';
	var re = new RegExp(search_text);
	var matched_count = 0;
	var table = document.getElementById("query-table");
	var html = table.innerHTML;
	var isBoardedIsNull;
	var doStayAtSelfStudyIsNull;
	grade_option = (grade_option == '' ? 'a' : grade_option);
	if (search_text == '')
		document.title = 'KCIS Stud. List - Friendly View';
	else
		document.title = `KCIS Stud. List - ${search_text} - Friendly View`;
	console.log("Search: " + search_text);
	console.log("Matched Studs:");
	for (let i = 0; i < studs.length; i++){
		var stud = studs[i];
		if ((
		((search_all || category_option == 'i') && re.test(stud.id)) ||
		((search_all || category_option == 'n') && re.test(stud.name)) ||
		((search_all || category_option == 'p') && re.test(stud.pinyin)) ||
		((search_all || category_option == 'b') && re.test(stud.birthday)) ||
		((search_all || category_option == 'h') && re.test(stud.homeroom)) ||
		((search_all || category_option == 'c') && re.test(stud.card_id))) &&
		(stud.grade == grade_option || grade_option == 'a')){
			isBoardedIsNull = stud.isBoarded != false && !stud.isBoarded;
			doStayAtSelfStudyIsNull = stud.doStayAtSelfStudy != false && !stud.doStayAtSelfStudy;
			console.log(stud);
			html += `<li class="table-row">
			<div class="col col-1" data-label="Id">${stud.id}</div>
			<div class="col col-2" data-label="Name">${stud.name}</div>
			<div class="col col-2" data-label="Pinyin">${stud.pinyin}</div>
			<div class="col col-1" data-label="Birthday">${stud.birthday}</div>
			<div class="col col-2" data-label="Homeroom">${stud.homeroom}</div>
			<div class="col col-2" data-label="Card Id">${stud.card_id}</div>
			<div class="col col-2" data-label="Dorm">
				<input type="checkbox" ${stud.isBoarded?'checked':(isBoardedIsNull ? 'style=\'display: none;\'' : '')} disabled>${isBoardedIsNull ? '<span style="color: red;font-style: italic;">[Unknow]</span>&nbsp;' : ''}Boarded;
				<br>
				<input type="checkbox" ${stud.doStayAtSelfStudy?'checked':(doStayAtSelfStudyIsNull ? 'style=\'display: none;\'' : '')} disabled>${doStayAtSelfStudyIsNull ? '<span style="color: red;font-style: italic;">[Unknow]</span>&nbsp;' : ''}Self Study
		  	</div>
			</li>`;
			matched_count++;
		}
	}
	table.innerHTML = html;
	document.getElementById('data-count').innerText = matched_count;
	document.getElementById('data-tip').innerText = matched_count == 1 ? 'um' : 'a';
	console.log('Matched Data count: ' + matched_count);
	loadForm(grade_option, category_option, search_text);
}
function loadForm(arg_grade, arg_category, arg_search){
	grade.value = arg_grade;
	category.value = arg_category;
	search.value = arg_search;
}
function submit_search(){
	var search_arg = encodeURIComponent(search.value);
	var category_arg = encodeURIComponent(category.value);
	var grade_arg = encodeURIComponent(grade.value);
	var arg = `?grade=${grade_arg}&category=${category_arg}&search=${search_arg}`;
	window.location.href = window.location.pathname + arg;
	return false;
}
window.onload = loadData;