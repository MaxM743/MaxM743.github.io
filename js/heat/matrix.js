// Create a zeros Nx*Ny arrays.
function zeros(Nx, Ny){
  let mat = [];
  for (let i = 0; i < Nx; i++){
    let L = [];
    for (let j = 0; j < Ny; j++){
      L.push(0);
    }
    mat.push(L);
  }
  return mat
}

function ones(Nx, Ny){
  let mat = [];
  for (let i = 0; i < Nx; i++){
    let L = [];
    for (let j = 0; j < Ny; j++){
      L.push(1);
    }
    mat.push(L);
  }
  return mat
}


function randMat(Nx, Ny, xmin, xmax){
  let mat = [];
  for (let i = 0; i < Nx; i++){
    let L = [];
    for (let j = 0; j < Ny; j++){
      L.push(random(xmin, xmax));
    }
    mat.push(L);
  }
  return mat
}

function sinMat(Nx, Ny, mod){
  let mat = [];
  for (let i = 0; i < Nx; i++){
    let L = [];
    for (let j = 0; j < Ny; j++){
      let x = map(i*10, 0, 10*Nx, 0, 2*PI);
      let y = map(j*10, 0, 10*Ny, 0, 2*PI);
      L.push(mod*sin(x));
    }
    mat.push(L);
  }
  return mat
}

function expMat(Nx, Ny){
  let mat = [];
  for (let i = 0; i < Nx; i++){
    let L = [];
    for (let j = 0; j < Ny; j++){
      let x = map(i*10, 0, 10*Nx, 0, 4);
      let y = map(j*10, 0, 10*Ny, 0, 2*PI);
      L.push(exp(x));
    }
    mat.push(L);
  }
  return mat
}

function findMin(mat){
  let minimum = +Infinity;
  for (let i = 0; i < mat.length; i++){
    for (let j = 0; j < mat[0].length; j++){
      if (mat[i][j] < minimum){
        minimum = mat[i][j]; 
      }
    }
  }
  return minimum
}
function findMax(mat){
  let maximum = -Infinity;
  for (let i = 0; i < mat.length; i++){
    for (let j = 0; j < mat[0].length; j++){
      if (mat[i][j] > maximum){
        maximum = mat[i][j]; 
      }
    }
  }
  return maximum
}

function copyMat(mat){
  let newmat = zeros(mat.length, mat[0].length);
  for (let i = 0; i < mat.length; i++){
    for (let j = 0; j < mat[0].length; j++){
      newmat[i][j] = mat[i][j];
    }
  }  
  return newmat
}

function addMat(mat1, mat2){
  if (mat1.length == mat2.length && mat1[0].length == mat2[0].length){
    let sum = zeros(mat1.length, mat1[0].length);
    for (let i = 0; i < mat1.length; i++){
      for (let j = 0; j < mat1[0].length; j++){
        sum[i][j] = mat1[i][j] + mat2[i][j];
      }
    }
    return sum
  }else{
    print("matrices have different sizes")
    return 0
  }
}

function transpMat(mat){
  
  if (mat[0].length){
      let transp = zeros(mat[0].length, mat.length);
      for (let i = 0; i < mat.length; i++){
        for (let j = 0; j < mat[0].length; j++){
      transp[j][i] = mat[i][j];
      }
    }
    return transp
  }else{
    let transp = zeros(mat.length, 1);
    for (let i = 0; i < mat.length; i++){
      transp[i][0] = mat[i];      
    }
    return transp
  }

}

function multMat(mat1, mat2){
  if (mat1[0].length == mat2.length){
    let prod = zeros(mat1.length, mat2[0].length);
    for (let i = 0; i < mat1.length; i++){
      for (let j = 0; j < mat2[0].length; j++){
        let sum = 0;
        for (let k = 0; k < mat2.length; k++){
          sum += mat1[i][k] * mat2[k][j];   
        }
        
        prod[i][j] = sum;
      }
    }
    return prod
  }else{
    print("matrices have different sizes")
    return 0
  }
}



function multCstMat(cst, mat){
  let newmat = zeros(mat.length, mat[0].length);
  for (let i = 0; i < mat.length; i++){
    for (let j = 0; j < mat[0].length; j++){
      newmat[i][j] = cst * mat[i][j];
    }
  }
  return newmat
}

function printMat(mat){
    for (let i = 0; i < mat.length; i++){
      print(mat[i])
    } 
}