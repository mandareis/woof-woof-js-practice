(function () {
  const url = "http://localhost:3000/pups";
  const dogbar = document.querySelector("#dog-bar");
  const doginfo = document.querySelector("#dog-info");
  function getPups() {
    fetch(url)
      .then((res) => res.json())
      .then((pupsData) => renderPups(pupsData));
  }

  function renderPups(pups) {
    dogbar.append(
      ...pups.map(function (p) {
        const span = document.createElement("span");
        span.addEventListener("click", singlePup(p));
        span.innerText = p.name;
        return span;
      })
    );
  }
  function singlePup(p) {
    return function () {
      doginfo.innerHTML = "";
      const name = document.createElement("h3");
      name.innerText = p.name;
      const img = document.createElement("img");
      img.src = p.image;
      const isGoodDog = document.createElement("button");
      if (p.isGoodDog) {
        isGoodDog.innerText = "Good Dog!";
      } else {
        isGoodDog.innerText = "Bad Dog!";
      }
      doginfo.append(name, img, isGoodDog);

      isGoodDog.addEventListener("click", handlesDogStatusClick(p));
    };
  }

  function handlesDogStatusClick(p) {
    return function () {
      let isGoodDog = !p.isGoodDog;
      fetch(`http://localhost:3000/pups/${p.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          isGoodDog,
        }),
      })
        .then((res) => res.json())
        .then((updatedData) => {
          singlePup(updatedData)();
        });
    };
  }
  getPups();
})();
