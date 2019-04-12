import React, { Component } from 'react';
import './App.css';
import ReactModal from 'react-modal';

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      menuSection: [
        // {
        //   "Items": [
        //     {
        //       "title": "Chicken Over Rice1",
        //       "price": 12,
        //     },{
        //       "title": "Beef Over Rice1",
        //       "price": 12,
        //     },{
        //       "title": "Fish Over Rice1",
        //       "price": 12,
        //     }],
        //   "name": "Lunch Specials"
        // },{
        //   "Items": [
        //     {
        //       "title": "Chicken Over Rice2",
        //       "price": 12,
        //     },{
        //       "title": "Beef Over Rice2",
        //       "price": 12,
        //     },{
        //       "title": "Fish Over Rice2",
        //       "price": 12,
        //     },
        //   ],
        //   "name": "Dinner Specials"
        // },{
        //   "Items": [
        //     {
        //       "title": "Chicken Over Rice3",
        //       "price": 12,
        //     },
        //     {
        //       "title": "Beef Over Rice3",
        //       "price": 12,
        //     },{
        //       "title": "Fish Over Rice3",
        //       "price": 12,
        //     }
        //   ],
        //   "name": "Other Specials"
        // },
      ],
      sectionSelected: null,
      itemsSelected: null,
      sectionIsOpen: false,
      itemIsOpen: false,
      inputName: ""
    }
  }

  menuSectionOnClick() {
    this.setState({sectionIsOpen: true});
  }

  sectionItemOnClick() {
    if (this.state.sectionSelected !== null) {
      this.setState({itemIsOpen: true});
    }
  }

  sectionCreated() {
    let arr = this.state.menuSection;
    let check = false;
    arr.forEach(obj => {
      if (obj.name === this.state.inputName) {
        alert("Section Name Repeated!");
        check = true;
      }
    })
    if (check) return;
    arr.push({
      "Items": [],
      "name": this.state.inputName
    });
    this.setState({
      menuSection: arr,
      sectionIsOpen: false,
      inputName: ""
    });
  }

  itemCreated() {
    let arr = this.state.menuSection;
    let check = false;
    arr.forEach(obj => {
      if (obj.name === this.state.sectionSelected) {
        obj.Items.forEach(item => {
          if (item.title === this.state.inputName) {
            check = true;
            alert("Item Name Repeated!");
          }
        })
        if (!check) {
          obj.Items.push({
            "title": this.state.inputName,
            "price": 12
          })
        }
      }
    })
    if (check) return;
    this.setState({
      menuSection: arr,
      itemIsOpen: false,
      inputName: ""
    });
  }

  render() {
    return (
      <div id="main">
        <div id="col1">
          <table id="simple-board-col1">
            <tbody>
              <tr><td>Menu Sections<i onClick={() => this.menuSectionOnClick()}>+</i></td></tr>
              {
                this.state.menuSection.map(section => {
                  return section.name === this.state.sectionSelected ?
                  <tr><td style={{backgroundColor: "green"}}
                          key={section.name}
                          onClick={() => this.setState({sectionSelected: section.name, itemsSelected: null})}>{section.name}
                  </td></tr> : <tr><td key={section.name}
                          onClick={() => this.setState({sectionSelected: section.name, itemsSelected: null})}>{section.name}
                  </td></tr>
                })
              }
            </tbody>
          </table>
        </div>
        <div id="col2">
          <table id="simple-board-col2">
            <tbody>
              <tr><td>Section Items<i onClick={() => this.sectionItemOnClick()}>+</i></td></tr>
              {
                this.state.menuSection.map(section => section.name === this.state.sectionSelected ?
                     section.Items.map(item => item.title === this.state.itemsSelected ?
                       <tr><td style={{backgroundColor: "green"}}
                               key={item.title}
                               onClick={() => this.setState({itemsSelected: item.title})}>{item.title}
                       </td></tr> : <tr><td key={item.title}
                               onClick={() => this.setState({itemsSelected: item.title})}>{item.title}
                       </td></tr>)
                  : ""
                )}
            </tbody>
          </table>
        </div>
        <div>
          <ReactModal isOpen={this.state.sectionIsOpen}
                      contentLabel="Section Selected" >
              <div class="modal-title">Add new Section</div>
              <label class="modal-label">name</label><input value={this.state.inputName} onChange={(e) => this.setState({inputName: e.target.value})}/>
              <div><button onClick={() => this.sectionCreated()}>Create</button></div>
              <div><button onClick={() => this.setState({sectionIsOpen: false})}>Cancel</button></div>
          </ReactModal>
        </div>
        <div>
          <ReactModal isOpen={this.state.itemIsOpen}
                      contentLabel="Item Selected" >
              <div class="modal-title">Add new Item</div>
              <label class="modal-label">name</label><input value={this.state.inputName} onChange={(e) => this.setState({inputName: e.target.value})}/>
              <div><button onClick={() => this.itemCreated()}>Create</button></div>
              <div><button onClick={() => this.setState({itemIsOpen: false})}>Cancel</button></div>
          </ReactModal>
        </div>
      </div>
    );
  }
}

export default App;
