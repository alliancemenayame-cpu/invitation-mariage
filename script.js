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