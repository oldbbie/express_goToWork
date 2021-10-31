		class App extends HTMLElement {
			constructor(props){
				super(props);
				this.state = {
					selected_day : 1,
					today : new Date(),
					showCalendar : new Date(),
					attend : ['2021-10-01','2021-10-04','2021-10-18','2021-10-27']
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
						if(day === (new Date(this.state.attend[cou])).getDate()) {
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