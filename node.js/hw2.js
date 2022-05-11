const A_Z = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
   let mod2 
    let split = " ";
    
    async function print(){
        try{
            
            for(i = 0; i < A_Z.length ; i++){
                if(i % 2 === 0){
                    mod2 = A_Z[i];
                }
                i++
                split += A_Z[i]+" "+ mod2 +" ";

            }
            await console.log(split);

        }catch{
            console.error("Error");
        }
      
    }
    print();
    