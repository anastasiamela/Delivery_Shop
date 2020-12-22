const { Product } = require('../models/product');
const mongoose = require('mongoose');
const { exist } = require('joi');

mongoose.connect('mongodb://localhost/delivery', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const product = [new Product({
    name: "Burrito con pollo",
    description: "Τορτίγια από αλεύρι με σάλτσα ranchera & λιωμένο τυρί. Γεμιστή με μαγειρεμένο κοτόπουλο.",
    category: {
        _id: category._id,
        name: "Burritos"
    },
    numberInStock: 25,
    price: 6.5
}),
new Product({
    name: "Burrito frio",
    description: "Κρύα τορτίγια αλευρίσια μαλακή με ψητό κοτόπουλο, pico de gallo, φρέσκο καλαμπόκι, παρμεζάνα & sour cream.",
    category: {
        _id: category._id,
        name: "Burritos"
    },
    numberInStock: 25,
    price: 6.4
}),
new Product({
    name: "Mexican Torre",
    description: "Τορτίγια αλευρίσια μαλακή με ψητό κοτόπουλο, pico de gallo, φρέσκο καλαμπόκι, παρμεζάνα & sour cream.",
    category: {
        _id: category._id,
        name: "Burritos"
    },
    numberInStock: 25,
    price: 6.4
}),
new Product({
    name: "Burrito chili con carne",
    description: "Τορτίγια αλευρίσια μαλακή με σάλτσα ranchera, λιωμένο τυρί και γέμιση chili con carne.",
    category: {
        _id: category._id,
        name: "Burritos"
    },
    numberInStock: 25,
    price: 6.5
}),
new Product({
    name: "Burrito veggi",
    description: "Τορτίγια αλευρίσια μαλακή με μαγειρεμένα λαχανικά και σάλτσα pico de gallo.",
    category: {
        _id: category._id,
        name: "Burritos"
    },
    numberInStock: 25,
    price: 5.4
}),
new Product({
    name: "Mama's Agavita",
    description: "Σαλάτα με πράσινη λόλα, κόκκινη λόλα, ψητά ντοματίνια, αβοκάντο, κόκκινα φασόλια & καλαμπόκι. Μέσα σε τραγανή φωλιά τορτίγιας, vinaigrette από αγαύη & ξεροψημένο μπέικον.",
    category: {
        _id: category._id,
        name: "Ensaladas"
    },
    numberInStock: 25,
    price: 6.5
}),
new Product({
    name: "Emiliano Zapata",
    description: "Σαλάτα με τρυφερές καρδιές από διάφορες πρασινάδες, φρέσκο κόλιανδρο, φρέσκο δυόσμο, καλαμπόκι, μαύρα φασόλια, κόκκινα φασόλια, vinaigrette λαδολέμονου αρωματισμένη με τζίντζερ, τραγανό μπέικον & ψητή πιπεριά chili. Μέσα σε τηγανητή τορτίγια.",
    category: {
        _id: category._id,
        name: "Ensaladas"
    },
    numberInStock: 25,
    price: 6.8
}),
new Product({
    name: "Mixta de bonito",
    description: "Σαλάτα με iceberg, πιπεριά κίτρινη, πιπεριά κόκκινη, κομμάτια μάνγκο, φιλέτο τόνου, κόκκινα φασόλια, ροδέλες από τηγανητό κρεμμύδι & vinaigrette πορτοκαλιού.",
    category: {
        _id: category._id,
        name: "Ensaladas"
    },
    numberInStock: 25,
    price: 7.8
}),
new Product({
    name: "Salpion de pollo",
    description: "Σαλάτα με μαρούλι, πικάντικο κοτόπουλο, μπέικον, ωτοματίνια, αυγό βραστό, τραγανά κρουτόν τορτίγιας & vinaigrette Mexican Caesar's.",
    category: {
        _id: category._id,
        name: "Ensaladas"
    },
    numberInStock: 25,
    price: 7.3
}),
new Product({
    name: "Pico de gallo con pollo",
    description: "Ψιλοκομμένο ψητό κοτόπουλο με παραδοσιακή σαλάτα ντομάτας.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6.3
}),
new Product({
    name: "Pico de gallo con atun",
    description: "Φιλετάκια τόνου με παραδοσιακή σαλάτα ντομάτας & κόκκινα φασόλια.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6.3
}),
new Product({
    name: "Chili con carne",
    description: "Μοσχαρίσιος κιμάς με πουρέ από μαύρα φασόλια & φρέσκο καλαμπόκι.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6.3
}),
new Product({
    name: "Chilorio",
    description: "Με λουκάνικο, αβοκάντο, κόκκινες μεξικάνικες πιπεριές & κόλιανδρο.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6
}),
new Product({
    name: "Chilorio",
    description: "Με λουκάνικο, αβοκάντο, κόκκινες μεξικάνικες πιπεριές & κόλιανδρο.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6
}),
new Product({
    name: "Griego",
    description: "Με φέτα, ντομάτα, ελιές & κρεμμύδι.",
    category: {
        _id: category._id,
        name: "Tacos"
    },
    numberInStock: 25,
    price: 6
}),
new Product({
    name: "Fajitas φιλέτο κοτόπουλο",
    description: "Μαγειρεμένο σε πυρωμένο μαντέμι. Με φιλέτο κοτόπουλο, κρεμμύδι, & πολύχρωμες πιπεριές. Συνοδεύεται από ρύζι.",
    category: {
        _id: category._id,
        name: "Fajitas"
    },
    numberInStock: 25,
    price: 9.9
}),
new Product({
    name: "Fajitas χοιρινό",
    description: "Μαγειρεμένο σε πυρωμένο μαντέμι. Με χοιρινό, κρεμμύδι, & πολύχρωμες πιπεριές. Συνοδεύεται από ρύζι.",
    category: {
        _id: category._id,
        name: "Fajitas"
    },
    numberInStock: 25,
    price: 9.8
}),
new Product({
    name: "Fajitas μοσχαρίσιο φιλέτο",
    description: "Μαγειρεμένο σε πυρωμένο μαντέμι. Με μοσχαρίσιο φιλέτο, κρεμμύδι, & πολύχρωμες πιπεριές. Συνοδεύεται από ρύζι.",
    category: {
        _id: category._id,
        name: "Fajitas"
    },
    numberInStock: 25,
    price: 12.8
}),
new Product({
    name: "Fajitas γαρίδες",
    description: "Μαγειρεμένο σε πυρωμένο μαντέμι. Με γαρίδες, κρεμμύδι, & πολύχρωμες πιπεριές. Συνοδεύεται από ρύζι.",
    category: {
        _id: category._id,
        name: "Fajitas"
    },
    numberInStock: 25,
    price: 10.9
}),
new Product({
    name: "Enchiladas",
    description: "Τορτίγια καλαμποκιού με σάλτσα enchilada & cheddar. Γεμιστή με μαγειρεμένο κοτόπουλο.",
    category: {
        _id: category._id,
        name: "Enchiladas | Quesadillas | Chimichanga"
    },
    numberInStock: 25,
    price: 6.8
}),
new Product({
    name: "Quesadillas",
    description: "Τορτίγια από αλεύρι με λιωμένο τυρί & πουρέ από φασόλια. Ψημένη σε πλάκα με μαγειρεμένο κοτόπουλο.",
    category: {
        _id: category._id,
        name: "Enchiladas | Quesadillas | Chimichanga"
    },
    numberInStock: 25,
    price: 6.6
}),
new Product({
    name: "Chimichanga",
    description: "Τορτίγια καλαμποκιού τηγανητή με κόκκινα φασόλια & πιπεριές jalapenos. Γεμιστή με μαγειρεμένο κοτόπουλο.",
    category: {
        _id: category._id,
        name: "Enchiladas | Quesadillas | Chimichanga"
    },
    numberInStock: 25,
    price: 7
}),
new Product({
    name: "Margarita",
    description: "Με τεκίλα λευκή, χυμό λεμόνι & triple sec.",
    category: {
        _id: category._id,
        name: "Cocktails"
    },
    numberInStock: 25,
    price: 5
}),
new Product({
    name: "Margarita strawberry",
    description: "Με τεκίλα λευκή, triple sec & πουρέ φράουλας.",
    category: {
        _id: category._id,
        name: "Cocktails"
    },
    numberInStock: 25,
    price: 5
}),
new Product({
    name: "Zombie",
    description: "Με παλαιωμένο ρούμι, absinthe, ανανά, φρούτα του πάθους, σιρόπι μπαχαρικών & lime.",
    category: {
        _id: category._id,
        name: "Cocktails"
    },
    numberInStock: 25,
    price: 7
}),
new Product({
    name: "Mai Tai",
    description: "Με ρούμι, χυμό lime, triple sec, σιρόπι & σουμάδα.",
    category: {
        _id: category._id,
        name: "Cocktails"
    },
    numberInStock: 25,
    price: 6
}),
new Product({
    name: "Mojito",
    description: "Με ρούμι, φύλλα μέντας, χυμό lime, ζάχαρη, σόδα & angostura bitters.",
    category: {
        _id: category._id,
        name: "Cocktails"
    },
    numberInStock: 25,
    price: 5
})];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}