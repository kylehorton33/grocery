 // frontend/src/App.js

 import React, { Component } from "react";
 import Modal from "./components/Modal";

 const groceryList = [
   {
     id: 1,
     item: "onion",
     category: "Buy ingredients to prepare dinner",
     purchased: true
   },
   {
     id: 2,
     item: "eggs",
     category: "Read Algebra and History textbook for upcoming test",
     purchased: false
   },
   {
     id: 3,
     item: "butter",
     category: "Go to library to rent sally's books",
     purchased: true
   },
   {
     id: 4,
     item: "artichokes",
     category: "Write article on how to use django with react",
     purchased: false
   }
 ];
 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       modal: false,
       viewPurchased: false,
       activeItem: {
         item: "",
         category: "",
         purchased: false
       },
       groceryList: groceryList
     };
   }
   toggle = () => {
     this.setState({ modal: !this.state.modal });
   };
   handleSubmit = item => {
     this.toggle();
     alert("save" + JSON.stringify(item));
   };
   handleDelete = item => {
     alert("delete" + JSON.stringify(item));
   };
   createItem = () => {
     const item = { item: "", category: "", purchased: false };
     this.setState({ activeItem: item, modal: !this.state.modal });
   };
   editItem = item => {
     this.setState({ activeItem: item, modal: !this.state.modal });
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
         >
           {item.item}
         </span>
         <span>
           <button
             onClick={() => this.editItem(item)}
             className="btn btn-secondary mr-2"
           >
             Edit
           </button>
           <button
             onClick={() => this.handleDelete(item)}
             className="btn btn-danger"
           >
             Delete
           </button>
         </span>
       </li>
     ));
   };
   render() {
     return (
       <main className="content">
         <h1 className="text-white text-uppercase text-center my-4">Grocery List</h1>
         <div className="row ">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
               <div className="">
                 <button onClick={this.createItem} className="btn btn-primary">
                   Add Item
                 </button>
               </div>
               {this.renderTabList()}
               <ul className="list-group list-group-flush">
                 {this.renderItems()}
               </ul>
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