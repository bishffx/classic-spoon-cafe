# AI Image Prompts — Classic Spoon Cafe

Generate each image with an AI image tool (Midjourney / DALL·E / Flux / etc.).
Save files into `public/images/<name>.jpg` (portrait 4:5 unless noted), then set the
matching `image` field in `src/data/menu.ts`, `src/data/gallery.ts`, or the section
component to `/images/<name>.jpg`.

## Shared style (append to every prompt)

> Warm editorial café photography, soft diffused natural window light, cream, espresso
> and terracotta colour palette, handmade imperfect feel, shallow depth of field,
> subtle film grain, photorealistic, 50mm lens, no text, no watermark.

---

## Hero (Home page) — 2 images

1. **hero-coffee.jpg** (portrait)
   An artisan latte with a spoon-drawn rosetta in a cream ceramic cup on a saucer, gentle steam rising, resting on a worn oak café table against a soft terracotta wall. + style

2. **hero-sandwich.jpg** (portrait)
   A grilled vegetable sandwich cut diagonally, melted cheese pull, golden toasted crust, on a ceramic plate with mint chutney on the side. + style

## Intro (Home page) — 1 image

3. **intro-interior.jpg** (portrait)
   Cozy café interior, warm cream walls, wooden tables, linen pendant lights glowing softly, a window seat with morning light, quiet and inviting. + style

## Food showcase collage (Home) — 6 images

4. **showcase-fries.jpg`** Crisp golden masala fries in a paper-lined tin basket with red chutney, scattered spice flakes. (square)
5. **showcase-brownie.jpg** Warm fudgy brownie with melting vanilla ice cream and a chocolate pour dripping over the edge. (square)
6. **showcase-sandwich.jpg** Pressed golden grilled sandwich, cheese oozing at the sides, a cut half lifted. (square→portrait ok)
7. **showcase-pasta.jpg** Creamy alfredo fettuccine on a wide rim bowl, twirled nest, parmesan dust. (square)
8. **showcase-coldcoffee.jpg** Tall glass of classic cold coffee with thick foam mountain, cream tone background. (square)
9. **showcase-pour.jpg** Barista hands pouring steamed milk into a coffee cup, creamy swirl forming. (landscape-ish ok)

## Experience panels (Home) — 6 images

10. **exp-table.jpg** A table set for one — cup, spoon, folded napkin, morning light. (panel p1)
11. **exp-steam.jpg** Close-up of a steaming coffee cup, foam, first sip, condensation. (p2)
12. **exp-grilled.jpg** Grilled sandwich pressed in a panini press, golden and steaming. (p3)
13. **exp-corner.jpg** A quiet corner nook: window seat, armchair, reading lamp, warm shadow. (p4)
14. **exp-cake.jpg** A slice of classic cheesecake with berry compote on a small plate with a spoon. (p5)
15. **exp-seat.jpg** Empty café table with two chairs, a spoon resting on the table, end-of-evening calm. (p6)

## About page — 4 images

16. **about-seating.jpg** Warm café seating area: wooden benches, cream cushions, hanging plants, afternoon light. (portrait)
17. **about-pour.jpg** Coffee being poured from a spouted kettle into a dripper, slow motion, steam. (portrait)
18. **about-fries.jpg** A generous basket of masala fries with two chutneys, close and crisp. (portrait)
19. **about-dessert.jpg** Chocolate mousse in a glass cup topped with cream and a cocoa dusting, spoon beside it. (portrait)

---

## Gallery (`src/data/gallery.ts`) — 12 images (mix of portrait 4:5 and square)

20. **gal-1.jpg** Barista pouring a flat white, rosetta emerging, top-down. (4:5)
21. **gal-2.jpg** Golden hour table by the window: coffee, notebook, and a spoon, warm glow. (4:5)
22. **gal-3.jpg** Masala fries fresh from the fryer, steam visible, rustic paper wrap. (1:1)
23. **gal-4.jpg** Sunday morning spread: coffee, grilled sandwich, brownie and fruit on a wooden table. (4:5)
24. **gal-5.jpg** Two flat whites side by side, saucers and spoons, cafe counter bokeh behind. (1:1)
25. **gal-6.jpg** A group table laid out for friends — cups, plates, relaxed messy warmth. (4:5)
26. **gal-7.jpg** Toastie cut in half, golden crust, cheese strings, garnished. (1:1)
27. **gal-8.jpg** Someone grabbing a corner seat, coffee in hand, soft window light. (4:5)
28. **gal-9.jpg** Iced cold brew glass, ice cubes, dark amber pour, condensation droplets. (4:5)
29. **gal-10.jpg** Almost-empty pasta bowl with sauce swirls, fork resting, satisfied finish. (1:1)
30. **gal-11.jpg** A kulhad/glass of masala chai with foam, spices on the saucer. (4:5)
31. **gal-12.jpg** The café right before closing — empty chairs on tables upside-down, warm dim light. (1:1)

---

## Menu (`src/data/menu.ts`) — 26 images. File name = menu id + `.jpg`

### Coffee
32. **signature-latte.jpg** Latte with a classic spoon-drawn rosetta in a ceramic cup. → `image: 'coffee'`
33. **cold-brew.jpg** Tall glass of cold brew with big clear ice cubes, deep amber. → `image: 'coffee'`
34. **classic-cappuccino.jpg** Cappuccino with a thick foam dome dusted with cocoa, cup on saucer. → `image: 'coffee'`
35. **filter-coffee.jpg** South Indian filter coffee in a steel dabara tumbler, frothy top. → `image: 'coffee'`

### Tea
36. **masala-chai.jpg** Masala chai in a glass, foam cap, cardamom and ginger scattered on the saucer. → `image: 'tea'`
37. **green-tea.jpg** Light green tea in a clear glass teapot, leaves unfurling. → `image: 'tea'`
38. **iced-lemon-tea.jpg** Tall iced lemon tea with lemon wheels and mint, condensation. → `image: 'tea'`
39. **ginger-tulsi-tea.jpg** Golden herbal tulsi-ginger tea in a warm amber glass, steam rising. → `image: 'tea'`

### Snacks
40. **masala-fries.jpg** Crisp golden masala fries with red chutney dip. → `image: 'snack'`
41. **cheese-garlic-bread.jpg** Cheesy garlic bread slice, molten pull, herb flecks. → `image: 'snack'`
42. **peri-peri-fries.jpg** Fries dusted with fiery red peri-peri spice, on dark ceramic. → `image: 'snack'`
43. **veg-spring-rolls.jpg** Crispy golden spring rolls, cut to show filling, sweet chilli dip. → `image: 'snack'`

### Sandwiches
44. **grilled-veg-sandwich.jpg** Grilled veg sandwich, golden grill marks, cheese melt, chutney. → `image: 'sandwich'`
45. **chicken-tikka-sandwich.jpg** Smoky chicken tikka sandwich with slaw, charred edges. → `image: 'sandwich'`
46. **paneer-sandwich.jpg** Tandoori paneer sandwich with char-grilled peppers, red spice flecks. → `image: 'sandwich'`

### Pasta
47. **alfredo-pasta.jpg** Creamy alfredo fettuccine, parmesan snowfall, black pepper. → `image: 'pasta'`
48. **arrabbiata-pasta.jpg** Arrabbiata pasta in a rich red chilli tomato sauce, white bowl, chilli flakes. → `image: 'pasta'`
49. **pesto-pasta.jpg** Basil pesto pasta ribbons, toasted pine nuts, parmesan shavings. → `image: 'pasta'`

### Desserts
50. **brownie-ice-cream.jpg** Warm fudgy brownie, melting vanilla ice cream, chocolate pour. → `image: 'dessert'`
51. **classic-cheesecake.jpg** Silky baked cheesecake slice, biscuit base, berry compote. → `image: 'dessert'`
52. **chocolate-mousse.jpg** Dark airy chocolate mousse cup, cocoa dusting, cream swirl. → `image: 'dessert'`
53. **tiramisu-cup.jpg** Tiramisu cup, cocoa-dusted layers, mascarpone swoosh, coffee beans. → `image: 'dessert'`

### Beverages
54. **fresh-lime-soda.jpg** Fresh lime soda with fizzy bubbles, salt-sweet rim, lime wheel. → `image: 'beverage'`
55. **cold-coffee.jpg** Classic blended cold coffee with a tall foam mountain, cream cup look. → `image: 'beverage'`
56. **orange-juice.jpg** Tall glass of fresh orange juice, pulp swirls, orange halves behind. → `image: 'beverage'`
57. **mixed-fruit-shake.jpg** Thick mixed fruit shake, cream top, fruit garnish. → `image: 'beverage'`

---

## Wiring after generating
- Menu: set `image: '/images/<filename>'` for each item in `src/data/menu.ts`.
- Gallery: set `image: '/images/<filename>'` in `src/data/gallery.ts` (keep `aspect`).
- Hero: edit `src/components/sections/Hero.tsx` (lines ~201, 214) to the new paths.
- Intro/about/showcase/experience: edit the `src` value passed to `<CafeImage>` in
  `Intro.tsx`, `AboutPage.tsx`, `FoodShowcase.tsx`, `Experience.tsx`.