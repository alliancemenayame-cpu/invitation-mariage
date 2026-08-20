// =========================
// CONFIGURATION
// =========================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzDKfA7jwxw6LTvC-dqO6GQcuEetHs9w3rIeu-OEv4UI4Ab1uBZySSc1aUFhtw_J9A3ZA/exec";


// =========================
// ÉLÉMENTS
// =========================

const openInvitation =
    document.getElementById("openInvitation");

const invitation =
    document.getElementById("invitation");

const weddingMusic =
    document.getElementById("weddingMusic");


// =========================
// OUVRIR L'INVITATION
// + MUSIQUE
// =========================

openInvitation.addEventListener("click", async function () {

    try {

        weddingMusic.muted = false;
        weddingMusic.volume = 1;
        weddingMusic.currentTime = 0;

        await weddingMusic.play();

        console.log("🎵 Musique démarrée");

    } catch (error) {

        console.error(
            "❌ La musique ne démarre pas :",
            error
        );

    }

    invitation.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// IDENTIFIANT INVITÉ
// =========================

const urlParams =
    new URLSearchParams(window.location.search);

const inviteId =
    urlParams.get("invite");


// =========================
// ÉLÉMENTS INVITÉ
// =========================

const guestName =
    document.getElementById("guestName");

const guestNumber =
    document.getElementById("guestNumber");

const guestTable =
    document.getElementById("guestTable");

const rsvpGuestName =
    document.getElementById("rsvpGuestName");

const rsvpGuestNumber =
    document.getElementById("rsvpGuestNumber");

const rsvpGuestTable =
    document.getElementById("rsvpGuestTable");


// =========================
// CHARGER LES INFORMATIONS
// DE L'INVITÉ
// =========================

async function loadGuest() {

    if (!inviteId) {

        guestName.textContent =
            "Invitation personnalisée";

        guestNumber.textContent =
            "-";

        guestTable.textContent =
            "-";

        rsvpGuestName.textContent =
            "Invité";

        rsvpGuestNumber.textContent =
            "-";

        rsvpGuestTable.textContent =
            "-";

        return;
    }

    try {

        const response =
            await fetch(
                GOOGLE_SCRIPT_URL +
                "?invite=" +
                encodeURIComponent(inviteId)
            );

        const data =
            await response.json();

        if (data.success) {

            guestName.textContent =
                data.name;

            guestNumber.textContent =
                data.guests;

            guestTable.textContent =
                data.table;

            rsvpGuestName.textContent =
                data.name;

            rsvpGuestNumber.textContent =
                data.guests;

            rsvpGuestTable.textContent =
                data.table;

        } else {

            guestName.textContent =
                "Invité introuvable";

            guestNumber.textContent =
                "-";

            guestTable.textContent =
                "-";
        }

    } catch (error) {

        console.error(
            "Erreur chargement invité :",
            error
        );

        guestName.textContent =
            "Bienvenue";
    }
}

loadGuest();


// =========================
// COMPTE À REBOURS
// SOIRÉE DANSANTE
// 04 SEPTEMBRE 2026 À 20H30
// =========================

const weddingDate =
    new Date("2026-09-04T20:30:00+01:00");


function updateCountdown() {

    const now =
        new Date();

    const difference =
        weddingDate - now;

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if (!days || !hours || !minutes || !seconds) {
        return;
    }


    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const d =
        Math.floor(
            totalSeconds / 86400
        );


    const h =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const m =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const s =
        totalSeconds % 60;


    days.textContent =
        String(d).padStart(2, "0");

    hours.textContent =
        String(h).padStart(2, "0");

    minutes.textContent =
        String(m).padStart(2, "0");

    seconds.textContent =
        String(s).padStart(2, "0");
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// =========================
// RSVP
// =========================

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpButton =
    document.getElementById("rsvpButton");

const rsvpButtonText =
    document.getElementById("rsvpButtonText");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");


// =========================
// BOISSONS
// =========================

const drinkInputs =
    document.querySelectorAll(
        'input[name="drink"]'
    );

const drinkCounter =
    document.getElementById(
        "drinkCounter"
    );

const drinkError =
    document.getElementById(
        "drinkError"
    );


// =========================
// GESTION DES BOISSONS
// =========================

drinkInputs.forEach(function (input) {

    input.addEventListener(
        "change",
        function () {

            const selected =
                Array.from(
                    drinkInputs
                ).filter(
                    function (item) {
                        return item.checked;
                    }
                );


            if (selected.length > 2) {

                input.checked = false;

                drinkError.textContent =
                    "Vous devez choisir exactement 2 boissons.";

                updateDrinkCounter();

                return;
            }


            if (selected.length === 2) {

                const firstType =
                    selected[0].dataset.type;

                const secondType =
                    selected[1].dataset.type;


                if (
                    firstType !==
                    secondType
                ) {

                    input.checked = false;

                    drinkError.textContent =
                        "Veuillez choisir 2 boissons de la même catégorie.";

                } else {

                    drinkError.textContent =
                        "";
                }

            } else {

                drinkError.textContent =
                    "";
            }


            updateDrinkCounter();

        }
    );

});


// =========================
// COMPTEUR BOISSONS
// =========================

function updateDrinkCounter() {

    const selected =
        Array.from(
            drinkInputs
        ).filter(
            function (input) {
                return input.checked;
            }
        );


    drinkCounter.textContent =
        selected.length +
        " / 2 boissons sélectionnées";


    if (selected.length === 2) {

        drinkCounter.classList.add(
            "complete"
        );

    } else {

        drinkCounter.classList.remove(
            "complete"
        );
    }
}


// =========================
// ENVOI RSVP
// =========================

rsvpForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        if (!inviteId) {

            alert(
                "Cette invitation n'est pas personnalisée."
            );

            return;
        }


        const attendanceElement =
            document.querySelector(
                'input[name="attendance"]:checked'
            );


        if (!attendanceElement) {

            alert(
                "Veuillez indiquer si vous serez présent(e)."
            );

            return;
        }


        const attendance =
            attendanceElement.value;


        const selectedDrinks =
            Array.from(
                drinkInputs
            )
            .filter(
                function (input) {
                    return input.checked;
                }
            )
            .map(
                function (input) {
                    return input.value;
                }
            );


        if (selectedDrinks.length !== 2) {

            drinkError.textContent =
                "Veuillez choisir exactement 2 boissons.";

            alert(
                "Veuillez choisir exactement 2 boissons."
            );

            return;
        }


        const drinkType =
            Array.from(
                drinkInputs
            )
            .filter(
                function (input) {
                    return input.checked;
                }
            )
            .map(
                function (input) {
                    return input.dataset.type;
                }
            );


        if (
            drinkType[0] !==
            drinkType[1]
        ) {

            alert(
                "Les 2 boissons doivent être de la même catégorie."
            );

            return;
        }


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        rsvpButton.disabled =
            true;

        rsvpButtonText.textContent =
            "Envoi en cours…";


        const data = {

            inviteId:
                inviteId,

            attendance:
                attendance,

            drinks:
                selectedDrinks.join(" + "),

            message:
                message
        };


        try {

            const response =
                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",
                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            if (result.success) {

                rsvpForm.reset();

                updateDrinkCounter();

                rsvpButton.style.display =
                    "none";

                rsvpSuccess.classList.add(
                    "show"
                );


                rsvpSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            } else {

                alert(
                    result.error ||
                    "Une erreur est survenue."
                );


                rsvpButton.disabled =
                    false;

                rsvpButtonText.textContent =
                    "Confirmer ma présence";
            }


        } catch (error) {

            console.error(error);

            alert(
                "Impossible d'envoyer votre réponse pour le moment."
            );


            rsvpButton.disabled =
                false;

            rsvpButtonText.textContent =
                "Confirmer ma présence";
        }

    }
);// =========================
// TÉLÉCHARGER L'INVITATION
// =========================

const downloadInvitation =
    document.getElementById("downloadInvitation");

if (downloadInvitation) {

    downloadInvitation.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}