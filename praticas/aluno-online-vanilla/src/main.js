let dados = JSON.parse(localStorage.getItem("dados")) || []

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formCadastro")

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault()

      const email = document.getElementById("email").value.trim()
      const senha = document.getElementById("senha").value.trim()

      if (!email || !senha.includes("@")) {
        alert("Preencha corretamente")
        return
      }

      dados.push({ email, senha })
      localStorage.setItem("dados", JSON.stringify(dados))

      alert("Cadastrado com sucesso!")
      form.reset()
    })
  }

  const lista = document.getElementById("lista")

  if (lista) {
    lista.innerHTML = ""

    if (dados.length === 0) {
      lista.innerHTML = "<p>Nenhum usuário cadastrado</p>"
      return
    }

    dados.forEach((item, index) => {
      const li = document.createElement("li")

      li.innerHTML = `
        ${item.nome} - ${item.email}
        <button class="delete" onclick="remover(${index})">X</button>
      `

      lista.appendChild(li)
    })
  }

  window.remover = function(index) {

  const confirmar = confirm("Tem certeza que deseja excluir este usuário?")

  if (!confirmar) return

  dados.splice(index, 1)
  localStorage.setItem("dados", JSON.stringify(dados))

  location.reload()
}

})