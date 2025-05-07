


<template>
  <form id="logIn">
      <h1>Iniciar sesion</h1>
      <p>Email del usuario:</p>
      <input type="email" id="logInEmail" placeholder="Email" required>
      <p>Contraseña:</p>
      <input type="password" id="logInPassword" placeholder="Password" required>
      <button type="submit"> Iniciar sesion</button>
      <p>Haz click aqui para darte de alta:</p>
      <button type="button" id="newUser"> ¡ Nuevo usuario !</button>
    </form>
</template>


<style scoped>

#logIn {
  padding: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
    height: 300px;
    background-color: rgb(233 234 235);
    align-items: center;


  h1{
    font-size: 40px;
    color: black;
  }

  p {
    font-size: 20px;
    color: black;
  }

  input {
        border-style: double;
        border-color: grey;
        border-radius: 6px;
        width: 170px;
        margin: 0.6em;
        height: 2em;
        text-align: center;
    }

  button {
      height: 2em;
      width: 12em;
      margin: 10px;
      border: 0px;
      border-radius: 5px;
    }


  }

</style>
