 // frontend/src/App.js

 import React, { Component } from "react";
 import Modal from "./components/Modal";
 import axios from "axios";


 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       modal: false,
       viewPurchased: false,
       viewCategorized: true,
       activeItem: {
         item: "",
         category: "",
         purchased: false
       },
       groceryList: []
     };
   }
   componentDidMount() {
    this.refreshList();
   }
   refreshList = () => {
    axios
      .get("http://localhost:8000/api/listitems/")
      .then(res => this.setState({ groceryList: res.data }))
      .catch(err => console.log(err));
   };

   displayPurchased = status => {
     if (status) {
       return this.setState({ viewPurchased: true });
     }
     return this.setState({ viewPurchased: false });
   };
   renderTabList = () => {
     return (
       <div className="my-5 tab-list">
         <span
           onClick={() => this.displayPurchased(true)}
           className={this.state.viewPurchased ? "active" : ""}
         >
           Purchased
         </span>
         <span
           onClick={() => this.displayPurchased(false)}
           className={this.state.viewPurchased ? "" : "active"}
         >
           To Buy
         </span>
       </div>
     );
   };
   renderItems = () => {
     const { viewPurchased } = this.state;
     const newItems = this.state.groceryList.filter(
       item => item.purchased === viewPurchased
     );
     return newItems.map(item => (
       <li
         key={item.id}
         className="list-group-item d-flex justify-content-between align-items-center"
       >
         <span
           className={`todo-title mr-2 ${
             this.state.viewPurchased ? "completed-todo" : ""
           }`}
           title={item.category}
           onClick={() => this.editItem(item)}
         >
           {item.item}
         </span>
         <span>
           <button
             onClick={() => this.handleDelete(item)}
             className="btn btn-danger"
           >
             Purchased
           </button>
         </span>
       </li>
     ));
   };
   toggle = () => {
    this.setState({ modal: !this.state.modal });
   };
   handleSubmit = item => {
    this.toggle();
    console.log("save" + JSON.stringify(item));
    if (item.id) {
      axios.put(
        `http://localhost:8000/api/listitems/${item.id}/`,
        {
          id: item.id,
          item: item.item,
          category: item.category,
          purchased: item.purchased
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    else {
      axios.post(
        "http://localhost:8000/api/listitems/",
        {
          item: item.item,
          category: item.category,
          purchased: item.purchased
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
   };
   handleDelete = item => {
    console.log("delete" + JSON.stringify(item));
    let id = item.id;
    console.log(`http://localhost:8000/api/listitems/${id}/`)
    axios.put(
      `http://localhost:8000/api/listitems/${id}/`,
      {
        item: item.item,
        category: item.category,
        purchased: true
      }
    )
    .then(function (response) {
      console.log(response); 
    })
    .catch(function (error) {
      console.log(error);
    });

   };
   createItem = () => {
    const item = { item: "", category: "", purchased: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
   };
   editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
   };
   toggleCategorizedView = () => {
     this.setState({ viewCategorized: !this.state.viewCategorized });
   }

   render() {
     return (
       <main className="content">
         <h1 className="text-uppercase text-center my-4">Gwocewy Wist</h1>
         <div className="row ">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
               <div className="">
                 <button onClick={this.createItem} className="my-2 btn btn-primary">
                   Add
                 </button>
               </div>
               
               <ul className="list-group list-group-flush">
                 {this.renderItems()}
                 
               </ul>
               {this.state.viewCategorized ? 
                    <div className="mx-auto p-2" onClick={() => this.toggleCategorizedView()}>
                      All Items
                    </div> :
                    <div className="mx-auto p-2" onClick={() => this.toggleCategorizedView()}>
                      Categorized
                    </div>
                 }
             </div>
           </div>
           
         </div>
         {this.state.modal ? (
           <Modal
             activeItem={this.state.activeItem}
             toggle={this.toggle}
             onSave={this.handleSubmit}
           />
         ) : null}
       </main>
     );
   }
 }
 export default App;