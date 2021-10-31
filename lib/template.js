module.exports = {
	html:function(js){
        return `
            <!doctype html>
            <html lang="ko">
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>expressProjectBook</title>
			<link rel="stylesheet" href="/css/common.css">
			<link rel="stylesheet" href="/css/index.css">
			<script>
				${js}
			</script>
            </head>
            <body>
				<div class="wrap app">
					<header>
						<div class="left">
							<button>메뉴</button>
							<h1>2021년 10월</h1>
						</div>
						<div class="right">
							<a href="/" id="prevMon">이전달</a>
							<a href="/">오늘</a>
							<a href="/" id="nextMon">다음달</a>
						</div>
					</header>
					<main>
						<custom-app></custom-app>
					</main>
					<footer>
						<button>출근</button>
					</footer>
				</div>
			</body>
            </html>
        `;
    }, js:function(showCalendar,selected_day,selected_mon,attend) { 
			var day='[';
			for(var i in attend) {
				var 앞의쉼표여부 = (i == 0) ?  '' : ',' ;
				day += 앞의쉼표여부 + attend[i].day.getDate();
			}
			day += ']';
			return ` 
				class App extends HTMLElement {
				constructor(props){
					super(props);
					this.state = {
						selected_day : ${selected_day},
						selected_mon : ${selected_mon},
						showCalendar : new Date('${showCalendar}'),
						attend : ${day}
					}
				}
				connectedCallback() {
					this.render();
				}
				setSelected_day(selected_day,td){
					this.state.selected_day = selected_day;
					this.render();
				}

				createNode(tag,parents,txt=undefined) {
					let node = document.createElement(tag);
					parents.appendChild(node);
					if(txt!=undefined) {
						node.innerHTML = txt;
					}
					return node;
				}
				render() {
					this.innerHTML='';
					
					document.getElementById('nextMon').setAttribute('href','/' + (this.state.selected_mon + 1));
					document.getElementById('prevMon').setAttribute('href','/' + (this.state.selected_mon - 1))
					
					let table = document.createElement('table');

					let thead = document.createElement('thead');

					let 필드 = document.createElement('tr');

					this.createNode('th',필드,'일').classList.add('holiday');
					this.createNode('th',필드,'월');
					this.createNode('th',필드,'화');
					this.createNode('th',필드,'수');
					this.createNode('th',필드,'목');
					this.createNode('th',필드,'금');
					this.createNode('th',필드,'토').classList.add('sat');

					thead.appendChild(필드);
					table.appendChild(thead);

					let tbody = document.createElement('tbody');

					let tempVar = this.state.showCalendar;
					let year = tempVar.getFullYear();
					let month = tempVar.getMonth();
					let prevFinalDay = new Date(year,month,0);
					let selectFinalDay = new Date(year,month+1,0);

					let day  = 1 - (new Date(year,month)).getDay();
					let nextDay = 1;

					let cou = 0;

					for(let i=0; i<6; i++) {
					let tr = document.createElement('tr');
						for(let j=0; j<7; j++) {
							let td;
							if(day < 1) {
								td = this.createNode('td',tr,prevFinalDay.getDate() + day);
								td.classList.add('otherMon');
							} else if(day > selectFinalDay.getDate()) {
								td = this.createNode('td',tr,nextDay++);
								td.classList.add('otherMon');
							} else {
								td = this.createNode('td',tr,day);
							}
							if(j==0) td.classList.add('holiday');
							if(j==6) td.classList.add('sat');
							if(day === this.state.attend[cou]) {
								this.createNode('span',td,'출석');
								cou++;
							}
							if(day === this.state.selected_day) td.classList.add('select');
							td.addEventListener('click',this.setSelected_day.bind(this,day,td));
							day++;
						}
						tbody.appendChild(tr);
					}

					table.appendChild(tbody);
					this.appendChild(table);
				}
			}
			customElements.define('custom-app',App)
		`
	}
}