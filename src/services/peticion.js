const peticionGet = async () => {
    const input = document.querySelector("#inputValor")
    return await axios.get(`https://rickandmortyapi.com/api/character?name=${input.value}`)
        .then(response => {
            const { results } = data.response;
            if (Array.isArray(results)) {
                const characters = results.map(
                    character => {
                        const { name, image } = results
                        return { name, image }
                    }
                )
                return character
            }
        }).catch(error => {
            console.log(error);
        })

}