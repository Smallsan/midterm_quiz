// Small script to enable 'More Info' toggle on touch devices
document.addEventListener("click", function (e) {
	const btn = e.target.closest(".more-btn");
	if (btn) {
		const card = btn.closest(".movie-card");
		if (card) card.classList.toggle("show");
	}
});
