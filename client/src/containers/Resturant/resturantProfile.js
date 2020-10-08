// import React,{Component} from 'react';
// import { Header, NavBarComp } from '../../components/header';
// class Resturant extends Component {
//     constructor(props) {
//         super();
//         this.state = {  }
//     }
//     render() { 
//         return ( 
//         <div>    
//             <section className="updates padding-top">
//             <div className="container-fluid">
//               <div className="row justify-content-center">
//                 <div className="col-lg-10">
//                   <div className="recent-updates card">
//                     <div className="card-header bg-dark text-white">
//                       <div className="row">
//                         <div className="col-md-6">
//                           <h3 className="h5">Profile</h3>
//                         </div>
//                         <div className="col-md-6 text-right">
//                           <h3 className="h5">User-ID: {/*?php echo $_SESSION['resturant_id']; ?*/}</h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body no-padding px-5 py-4">
//                       {/*?php
//                             $id=$_SESSION['resturant_id'];
//                             $query="SELECT * FROM register WHERE id=$id ";
//                             $run=mysqli_query($con,$query);
//                             $count=mysqli_num_rows($run);
//                             $row=mysqli_fetch_array($run);
//                             foreach ($row as $user) {
//                               $id=$row['id'];
//                               $name=$row['name'];
//                               $email=$row['email'];
//                               $phone=$row['phone'];
//                               $address=$row['address'];
//                               $res_type=$row['res_type'];
//                               $password=$row['password'];
//                               $created_at=$row['created_at'];
//                             }
//                           ?*/}
//                       <form action method="POST">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <label htmlFor className="font-weight-bold">Name:</label>
//                             <div className="form-group">
//                               <input type="text" className="form-control" defaultValue="<?php echo $name?>" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <label htmlFor className="font-weight-bold">Email</label>
//                             <div className="form-group">
//                               <input type="text" className="form-control" defaultValue="<?php echo $email?>" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <label htmlFor className="font-weight-bold">Phone:</label>
//                             <div className="form-group">
//                               <input type="text" className="form-control" defaultValue="<?php echo $phone?>" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <label htmlFor className="font-weight-bold">Address</label>
//                             <div className="form-group">
//                               <input type="text" className="form-control" defaultValue="<?php echo $address?>" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-md-4">
//                             <label htmlFor className="font-weight-bold">Password:</label>
//                             <div className="form-group">
//                               <input type="password" className="form-control" defaultValue="<?php echo $password ;?>" />
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <label htmlFor className="font-weight-bold">Created Date:</label>
//                             <div className="form-group">
//                               <input type="text" className="form-control" data-provide="datepicker" defaultValue="<?php echo date(" d-m-y", strtotime($created_at)); ? />"&gt;
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-group text-right" style={{marginTop: '33px'}}>
//                               <button type="submit" className="btn btn-success px-5 font-weight-bold">Save Profile</button>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                       {/* <div class="row">
//                               <div class="col-md-12 text-right">
//                                   <div class="form-group">
//                                       <form action="" method="POST" class="form-inline">
//                                         <input type="hidden" name="delete_id" 
//                                             value="<?php echo $_SESSION['resturant_id'];?>">
//                                         <button type="submit" name="delete_account" 
//                                         class="btn btn-danger px-4 mt-4  font-weight-bold">
//                                     Delete Account</button>
//                                 </form>
//                                   </div>
//                               </div>
//                           </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//          );
//     }
// }
 
// export default Resturant;