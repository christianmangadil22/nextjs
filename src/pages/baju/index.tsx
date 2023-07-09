import axios from 'axios';
import { useState,useEffect } from "react";
import { stat } from "fs";
import Link from 'next/link';

// const client = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com/posts"
// });

const koneksiBajudistro = axios.create({
   baseURL: "http://127.0.0.1:5000/api/bajudistro"
 }); 

export default function FormBajudistro() {
    const [bajudistro, setBajudistro] =  useState(null);
    const [kode_baju, setKode_baju] = useState("");
    const [nama_baju, setNama_baju] = useState("");
    const [pembeli, setPembeli] = useState("");
    const [size_baju, setSize_baju] = useState("");
    const [foto, setFoto] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

  const handleSubmitAdd =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiBajudistro
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });    
 }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.kode_baju.value;
      alert(address);
  //const formData = new FormData(event.target);
    const formData = {
      kode_baju: event.target.kode_baju.value,
      nama_baju: event.target.nama_baju.value,
      pembeli: event.target.pembeli,
      size_baju: event.target.size_baju,
      foto: event.target.foto,
      }

  alert(formData);
  koneksiBajudistro
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

    const handleAdd = (event) => {
      setAdd("show");
      setbtnAdd("hide");
      setEdit("hide");   
}

    const handleCancelAdd = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
}

    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
      setKode_baju("");
      setNama_baju("");
      setPembeli("");
      setSize_baju("");
      setFoto("");
}

    const handleDelete = (event) => {
      event.preventDefault();
      var kode_baju = event.target.value;
      koneksiBajudistro.delete(`/${kode_baju}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          setBajudistro(
            bajudistro.filter((bajudistro) => {
               return bajudistro.kode_baju !== kode_baju;
            }))
       
          // Lakukan langkah-langkah lain setelah penghapusan data
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })
  }

      const handleEdit = (event) => {
        event.preventDefault();
        var kode_baju = event.target.value;
 
              const bjEdit =  bajudistro.filter((bajudistro) => {
                   return bajudistro.kode_baju == kode_baju;
        });
                    if(bjEdit!=null){
                      setKode_baju(bjEdit[0].kode_baju);
                      setNama_baju(bjEdit[0].nama_baju);
                      setPembeli(bjEdit[0].pembeli);
                      setSize_baju(bjEdit[0].size_baju);
                      setFoto(bjEdit[0].foto);
                      setAdd("hide");
                      setbtnAdd("hide");
                      setEdit("show");
          }
        }

    useEffect(() => {
      async function getBajudistro() {
        const response = await koneksiBajudistro.get("/").then(function (axiosResponse) {
            setBajudistro(axiosResponse.data.data);
         })
         .catch(function (error) {
         
          alert('error from bajudistro in api bajudistro: '+error);
         });;
          }
      getBajudistro();
    }, []);

  if(!bajudistro) {
    return (

      <div><center><h1>Loading...</h1></center></div>

    )
  }

  else{
    return (
      

      <center>
      <div className="background">

      <br />
      <h1 style={{fontFamily: "Hobo Std",
                color:"white", 
                fontSize:"50px",
                backgroundColor:"#FF660D"
                }}>SELAMAT DATANG DI TIAN STORE</h1><br />
      <div>
      <title>ChristianMangadil_21560026</title>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd} 
              style={{backgroundColor: "#FF660D",
                      color:"white",
                      borderWidth:"1px",
                      padding:"13px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>TAMBAH</button>

       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}><br></br>
       <h2 style={{color:"white"}}>MASUKAN DATA</h2><br></br>

        <table border={0}>
            <tbody style={{color:"white",padding:"3px"}}>
        
        <tr>
            <td><label> Kode Baju : </label></td>
            <td><input type="text" id="kode_baju" name="kode_baju"/></td>
        </tr> 

        <tr>
            <td><label> Nama Baju : </label></td>
            <td><input type="text" id="nama_baju" name="nama_baju"/></td>
        </tr> 

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli" name="pembeli"/></td>
        </tr> 

        <tr>
            <td><label> Size Baju : </label></td>
            <td><input type="text" id="size_baju" name="size_baju"/></td>
        </tr> 

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>
        
        <br ></br>

            </tbody>
        </table>

          <input type="submit"  
                style={{padding: "5px",
                        color:"black",
                        backgroundColor:"yellow",
                        cursor: "pointer"
                        }}/>

          <input type="button" value="Cancel" onClick={handleCancelAdd} 
                style={{padding: "5px",
                        color:"black",
                        backgroundColor:"yellow",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form>  
      
 <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}><br></br>
          <h2 style={{color:"white"}}>FORM EDIT</h2><br></br>

        <table>
              <tbody style={{color:"white"}}>
        <tr>
            <td><label> Kode Baju : </label></td>
            <td><input type="text" id="kode_baju"  value={kode_baju} name="kode_baju"/></td>
        </tr>

        <tr>
            <td><label> Nama Baju : </label></td>
            <td><input type="text" id="nama_baju"  value={nama_baju} name="nama_baju"
               onChange={(e) => setNama_baju(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli"  value={pembeli} name="pembeli"
               onChange={(e) => setPembeli(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Size Baju : </label></td>
            <td><input type="text" id="size_baju"  value={size_baju} name="size_baju"
               onChange={(e) => setSize_baju(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>
        
        <br ></br>

              </tbody>
          </table>

          <input type="submit" 
                style={{padding:"3px",
                        color:"black",
                        backgroundColor:"yellow",
                        cursor: "pointer"
                        }}/>

|
          <input type="button" value="Cancel" onClick={handleCancelEdit}  
                style={{padding: "3px",
                        color:"black",
                        backgroundColor:"yellow",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form><br/><br/>
      
        <h3 style={{fontFamily:"arial black", fontSize:"27px", backgroundColor:"#FF660D", color:"white", 
        width:"40%", borderRadius:"5px",}}>
            TABEL LIST PEMBELIAN TIAN STORE</h3>
          
          <table className='desain'>
              <thead>
                <tr>         
                <th>Kode Baju</th>
                <th>Nama Baju</th>
                <th>Pembeli</th>
                <th>Size Baju</th>
                <th>Foto</th>
                <th colSpan={2}>Opsi</th>
                </tr>
              </thead>
      
              <tbody>
              {bajudistro.map((bj) =>
                  <tr style={{textAlign:'center'}}> 
                    <td>{bj.kode_baju}</td>
                    <td>{bj.nama_baju}</td>
                    <td>{bj.pembeli}</td>
                    <td>{bj.size_baju}</td>
                    <td><img src={bj.foto} width="150"/></td>

          <td><button onClick={handleEdit} value={bj.kode_baju} 
              style={{backgroundColor: "yellow",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Edit</button></td>

          <td><button onClick={handleDelete} value={bj.kode_baju}
              style={{backgroundColor: "Red",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Hapus</button></td>

                  </tr>
              )}
              </tbody>
    </table>
    </div>
    </div>
    </center>     
            
    )
  }
  }