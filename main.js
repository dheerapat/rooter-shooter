import kaboom from 'kaboom'

kaboom({
    width: 240,
    height: 160,
    scale: 5
})

loadRoot('sprites/')
loadSprite('asteroid', 'asteroid.png')
loadSprite('bg', 'bg.png')
loadSprite('bullet', 'bullet.png')
loadSprite('small_asteroid', 'small_asteroid.png')
loadSprite('spaceship', 'spaceship.png')
loadSprite('thruster_1', 'thruster_1.png')
loadSprite('thruster_2', 'thruster_2.png')
loadSprite('thruster_3', 'thruster_3.png')
loadSprite('thruster_4', 'thruster_4.png')

const sqRoot = [1, 4, 9, 16, 25, 36, 49, 64, 81]

scene('main', () => {
    layer([
        'bg',
        'obj',
        'ui'
    ], 'obj')

    add([
        sprite('bg', {
            width: width(),
            height: height(),
            tiled: true
        }),
        layer('bg')
    ])

    let score = 0
    let root = sqRoot[Math.floor(Math.random() * 9)]

    const ui = add([
        layer('ui')
    ])

    ui.on('draw', () => {
        drawText({
            text: "Score: " + score,
            size: 5,
            font: "sink",
            pos: vec2(8, 15)
        })

        drawText({
            text: "Square Root: " + root,
            size: 5,
            font: "sink",
            origin: 'center',
            pos: vec2(width()/2, 10)
        })
    })

    const player = add([
        sprite("spaceship"),
        pos(10, 50),
        rotate(90),
        origin("center"),
        solid(),
        area(),
        "player"
    ])

    onKeyDown('up', () => {
        player.move(0, -100)
    })

    onKeyDown('down', () => {
        player.move(0, 100)
    })

    function asteroidSpawn() {
        add([
            sprite("asteroid"),
            pos(width(), Math.floor(Math.random() * height())),
            origin("center"),
            "asteroid",
            area()
          ])
    }

    loop(2, () => {
        asteroidSpawn()
    })

    onUpdate('asteroid', (a) => {
        a.move(-100, 0)
        if (a.pos.x < 0) {
            destroy(a)
            score--
        }
    })

    onKeyPress('1', () => {
        if (root === 1) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('2', () => {
        if (root === 4) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('3', () => {
        if (root === 9) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('4', () => {
        if (root === 16) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('5', () => {
        if (root === 25) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('6', () => {
        if (root === 36) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('7', () => {
        if (root === 49) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('8', () => {
        if (root === 64) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onKeyPress('9', () => {
        if (root === 81) {
            add([
                sprite('bullet'),
                pos(player.pos),
                rotate(player.angle),
                origin('center'),
                area(),
                'bullet',
                {
                    speed: 100
                }
            ])
            root = sqRoot[Math.floor(Math.random() * 9)]
        }
    })

    onUpdate("bullet", (b) => {
        b.move(b.speed,0)
        if ((b.pos.x < 0) || (b.pos.x > width())) {
            destroy(b)
        }
    })

    onCollide('bullet', 'asteroid', (b, a) => {
        destroy(a)
        destroy(b)
        score++
    })

    onCollide('player', 'asteroid', (p, a) => {
        destroy(p)

        ui.on('draw', () => {
            drawText({
                text: "Game Over",
                size: 10,
                font: "sink",
                pos: vec2(width()/2, height()/2),
                origin: 'center'
            })
            drawText({
                text: "press r to reload",
                size: 5,
                font: "sink",
                pos: vec2(width()/2, height()/2 + 25),
                origin: 'center'
            })
        })
    })

    onKeyPress('r', () => {
        go('main')
      })
})

go('main')