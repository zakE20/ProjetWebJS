 function drawCircleImmediat(ctx, x, y, r, color) {
    // BONNE PRATIQUE : on sauvegarde le contexte
    // des qu'une fonction ou un bout de code le modifie
    // couleur, épaisseur du trait, systeme de coordonnées etc.
    ctx.save();

    // AUTRE BONNE PRATIQUE : on dessine toujours
    // en 0, 0 !!!! et on utilise les transformations
    // géométriques pour placer le dessin, le tourner, le rescaler
    // etc.
    ctx.fillStyle = color;
    ctx.beginPath();

    // on translate le systeme de coordonnées pour placer le cercle
    // en x, y
    ctx.translate(x, y);     
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // on restore le contexte à la fin
    ctx.restore();
}



export { drawCircleImmediat};