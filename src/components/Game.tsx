import React, { useEffect } from "react";
import Matter from "matter-js";

const BASE_PATH = "/suika-game";

const CHERRY = "cherry";
const STRAWBERRY = "strawberry";
const GRAPE = "grape";
const ORANGE = "orange";
const KAKI = "kaki";
const APPLE = "apple";
const PEAR = "pear";
const PEACH = "peach";
const PINEAPPLE = "pineapple";
const MELON = "melon";
const WATERMELON = "watermelon";

const CHERRY_COLOR = "#CE2E21";
const STRAWBERRY_COLOR = "#EC7259";
const GRAPE_COLOR = "#8C60EF";
const ORANGE_COLOR = "#F4B940";
const KAKI_COLOR = "#EB8E39";
const APPLE_COLOR = "#DC3224";
const PEAR_COLOR = "#F5EB88";
const PEACH_COLOR = "#F6CABF";
const PINEAPPLE_COLOR = "#F7EA4F";
const MELON_COLOR = "#96C942";
const WATERMELON_COLOR = "#2E651F";

const CHERRY_SIZE = 8 * 1.8;
const STRAWBERRY_SIZE = 10 * 1.8;
const GRAPE_SIZE = 14 * 1.8;
const ORANGE_SIZE = 17 * 1.8;
const KAKI_SIZE = 21 * 1.8;
const APPLE_SIZE = 27 * 1.8;
const PEAR_SIZE = 30 * 1.8;
const PEACH_SIZE = 37 * 1.8;
const PINEAPPLE_SIZE = 42 * 1.8;
const MELON_SIZE = 52 * 1.8;
const WATERMELON_SIZE = 62 * 1.8;

const nextFruitList = [CHERRY, STRAWBERRY, GRAPE, ORANGE, KAKI];

export default function Game() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [scene, setScene] = React.useState<Matter.Render>();
  const [isGmaeOver, setIsGameOver] = React.useState<boolean>(false);

  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

  const [nextFruits, setNextFruits] = React.useState<[string, string]>([
    Common.choose(nextFruitList),
    Common.choose(nextFruitList),
  ]);
  const [nextFruit, setNextFruit] = React.useState<Matter.Body>();

  const [engine, setEngine] = React.useState<Matter.Engine>();
  const [render, setRender] = React.useState<Matter.Render>();
  const [runner, setRunner] = React.useState<Matter.Runner>();
  const [mouse, setMouse] = React.useState<Matter.Mouse>();
  const [mouseConstraint, setMouseConstraint] = React.useState<Matter.MouseConstraint>();

  const createCherry = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, CHERRY_SIZE, {
      mass: 3,
      label: CHERRY,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: CHERRY_COLOR,
        sprite: { texture: `${BASE_PATH}/${CHERRY}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createStrawberry = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, STRAWBERRY_SIZE, {
      mass: 3,
      label: STRAWBERRY,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: STRAWBERRY_COLOR,
        sprite: { texture: `${BASE_PATH}/${STRAWBERRY}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createGrape = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, GRAPE_SIZE, {
      mass: 3,
      label: GRAPE,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: GRAPE_COLOR,
        sprite: { texture: `${BASE_PATH}/${GRAPE}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createOrange = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, ORANGE_SIZE, {
      mass: 3,
      label: ORANGE,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: ORANGE_COLOR,
        sprite: { texture: `${BASE_PATH}/${ORANGE}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createKaki = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, KAKI_SIZE, {
      mass: 3,
      label: KAKI,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: KAKI_COLOR,
        sprite: { texture: `${BASE_PATH}/${KAKI}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createApple = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, APPLE_SIZE, {
      mass: 3,
      label: APPLE,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: APPLE_COLOR,
        sprite: { texture: `${BASE_PATH}/${APPLE}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createPear = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, PEAR_SIZE, {
      mass: 3,
      label: PEAR,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: PEAR_COLOR,
        sprite: { texture: `${BASE_PATH}/${PEAR}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createPeach = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, PEACH_SIZE, {
      mass: 3,
      label: PEACH,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: PEACH_COLOR,
        sprite: { texture: `${BASE_PATH}/${PEACH}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createPineapple = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, PINEAPPLE_SIZE, {
      mass: 3,
      label: PINEAPPLE,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: PINEAPPLE_COLOR,
        sprite: { texture: `${BASE_PATH}/${PINEAPPLE}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createMelon = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, MELON_SIZE, {
      mass: 3,
      label: MELON,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: MELON_COLOR,
        sprite: { texture: `${BASE_PATH}/${MELON}.png`, xScale: 1, yScale: 1 },
      },
    });
  const createWatermelon = (x: number, y: number, skeleton?: boolean) =>
    Bodies.circle(x, y, WATERMELON_SIZE, {
      mass: 3,
      label: WATERMELON,
      isStatic: skeleton,
      isSensor: skeleton,
      render: {
        fillStyle: WATERMELON_COLOR,
        sprite: { texture: `${BASE_PATH}/${WATERMELON}.png`, xScale: 1, yScale: 1 },
      },
    });

  const nextFruitMap: { [key: string]: (x: number, y: number, skeleton?: boolean) => Matter.Body } =
    {
      [CHERRY]: createCherry,
      [STRAWBERRY]: createStrawberry,
      [GRAPE]: createGrape,
      [ORANGE]: createOrange,
      [KAKI]: createKaki,
    };

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
    if (!engine || !mouse) return;

    let x = mouse.position.x;
    const min_threshold = 115;
    const max_threshold = 485;

    switch (nextFruits[0]) {
      case CHERRY:
        if (x < min_threshold + CHERRY_SIZE) x = min_threshold + CHERRY_SIZE;
        if (x > max_threshold - CHERRY_SIZE) x = max_threshold - CHERRY_SIZE;
        Composite.add(engine.world, [createCherry(x, 115)]);
        break;
      case STRAWBERRY:
        if (x < min_threshold + STRAWBERRY_SIZE) x = min_threshold + STRAWBERRY_SIZE;
        if (x > max_threshold - STRAWBERRY_SIZE) x = max_threshold - STRAWBERRY_SIZE;
        Composite.add(engine.world, [createStrawberry(x, 115)]);
        break;
      case GRAPE:
        if (x < min_threshold + GRAPE_SIZE) x = min_threshold + GRAPE_SIZE;
        if (x > max_threshold - GRAPE_SIZE) x = max_threshold - GRAPE_SIZE;
        Composite.add(engine.world, [createGrape(x, 115)]);
        break;
      case ORANGE:
        if (x < min_threshold + ORANGE_SIZE) x = min_threshold + ORANGE_SIZE;
        if (x > max_threshold - ORANGE_SIZE) x = max_threshold - ORANGE_SIZE;
        Composite.add(engine.world, [createOrange(x, 115)]);
        break;
      case KAKI:
        if (x < min_threshold + KAKI_SIZE) x = min_threshold + KAKI_SIZE;
        if (x > max_threshold - KAKI_SIZE) x = max_threshold - KAKI_SIZE;
        Composite.add(engine.world, [createKaki(x, 115)]);
        break;
      default:
        break;
    }

    if (nextFruit) {
      Composite.remove(engine.world, nextFruit);
    }

    const _nextFruit = nextFruitMap[nextFruits[1]](x, 38, true);
    Composite.add(engine.world, _nextFruit);
    setNextFruit(_nextFruit);

    const _nextFruits = Common.choose(nextFruitList);
    setNextFruits([nextFruits[1], _nextFruits]);
  };

  const handleInit = () => {
    // TODO 正常に初期化する
    if (engine) {
      Matter.World.clear(engine?.world, true);
      Matter.Engine.clear(engine);
      Events.off(engine, "collisionActive", handleCollisionActive);
      Events.off(engine, "collisionStart", handleCollisionStart);
    }
    if (render) {
      render.canvas.remove();
    }
    if (runner) {
      Runner.stop(runner);
    }

    var _engine = engine ?? Engine.create();

    setEngine(_engine);

    const _render = Render.create({
      element: rootRef.current!,
      engine: _engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false,
        background: "#FCF6E7",
      },
    });

    setRender(_render);

    var grounds: Matter.Body[] = [
      Bodies.rectangle(100, 360, 30, 480, { isStatic: true, render: { fillStyle: "#F4D88B" } }),
      Bodies.rectangle(500, 360, 30, 480, { isStatic: true, render: { fillStyle: "#F4D88B" } }),
      Bodies.rectangle(300, 600, 400, 30, { isStatic: true, render: { fillStyle: "#F4D88B" } }),
      Bodies.rectangle(300, 120, 430, 30, {
        isStatic: true,
        collisionFilter: { category: 0 },
        render: { fillStyle: "#f9e8b8" },
      }),

      Bodies.rectangle(300, 90, 600, 5, {
        isSensor: true,
        isStatic: true,
        label: "deadline",
        render: { fillStyle: "transparent" },
      }),

      Bodies.rectangle(560, 360, 60, 400, {
        isStatic: true,
        render: { sprite: { texture: `${BASE_PATH}/revolution.png`, xScale: 0.7, yScale: 0.7 } },
      }),
    ];

    var bar = Bodies.rectangle(300, 300, 2, 600, {
      isStatic: true,
      collisionFilter: { category: 0 },
      render: { fillStyle: "#aaa" },
    });

    Composite.add(_engine.world, [...grounds, bar]);

    Render.run(_render);

    // create runner
    const _runner = Runner.create();
    setRunner(_runner);

    // run the _engine
    Runner.run(_runner, _engine);

    // add mouse control
    const _mouse = Mouse.create(_render.canvas);
    const _mouseConstraint = MouseConstraint.create(_engine, {
      mouse: _mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    setMouse(_mouse);
    setMouseConstraint(_mouseConstraint);

    Composite.add(_engine.world, _mouseConstraint);

    // keep the mouse in sync with rendering
    _render.mouse = _mouse;

    setScene(_render);

    // 次のフルーツの設定
    const _nextFruit = nextFruitMap[nextFruits[0]](300, 30, true);
    Composite.add(_engine.world, _nextFruit);
    setNextFruit(_nextFruit);

    const collisionedFruit: { [id: string]: boolean } = {};

    function handleCollisionStart(e: Matter.IEventCollision<Matter.Engine>) {
      if (!e.pairs[0]) return;

      e.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (bodyA.label === "deadline" || bodyB.label === "deadline") return;

        if (bodyA.label === "Rectangle Body" || bodyB.label === "Rectangle Body") return;

        if (bodyA.label === bodyB.label) {
          const position_x = (bodyA.position.x + bodyB.position.x) / 2;
          const position_y = (bodyA.position.y + bodyB.position.y) / 2;
          Composite.remove(_engine.world, bodyA);
          Composite.remove(_engine.world, bodyB);

          switch (bodyA.label) {
            case CHERRY:
                setScore(s => s + 1);
              Composite.add(_engine.world, [createStrawberry(position_x, position_y)]);
              break;
            case STRAWBERRY:
              setScore(s => s + 3);
              Composite.add(_engine.world, [createGrape(position_x, position_y)]);
              break;
            case GRAPE:
              setScore(s => s + 6);
              Composite.add(_engine.world, [createOrange(position_x, position_y)]);
              break;
            case ORANGE:
              setScore(s => s + 10);
              Composite.add(_engine.world, [createKaki(position_x, position_y)]);
              break;
            case KAKI:
              setScore(s => s + 15);
              Composite.add(_engine.world, [createApple(position_x, position_y)]);
              break;
            case APPLE:
              setScore(s => s + 21);
              Composite.add(_engine.world, [createPear(position_x, position_y)]);
              break;
            case PEAR:
              setScore(s => s + 28);
              Composite.add(_engine.world, [createPeach(position_x, position_y)]);
              break;
            case PEACH:
              setScore(s => s + 36);
              Composite.add(_engine.world, [createPineapple(position_x, position_y)]);
              break;
            case PINEAPPLE:
              setScore(s => s + 45);
              Composite.add(_engine.world, [createMelon(position_x, position_y)]);
              break;
            case MELON:
              setScore(s => s + 55);
              Composite.add(_engine.world, [createWatermelon(position_x, position_y)]);
              break;
            case WATERMELON:
              setScore(s => s + 66);
              break;
            default:
              break;
          }
        } else {
          collisionedFruit[bodyA.id] = true;
          collisionedFruit[bodyB.id] = true;
        }
      });
    }

    function handleCollisionActive(e: Matter.IEventCollision<Matter.Engine>) {
      if (!e.pairs[0]) return;

      e.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (
          (bodyA.label === "deadline" && collisionedFruit[bodyB.id]) ||
          (bodyB.label === "deadline" && collisionedFruit[bodyA.id])
        ) {
          console.log("Game Over!");
          Events.off(_engine, "collisionActive", handleCollisionActive);
          Events.off(_engine, "collisionStart", handleCollisionStart);
          Matter.Render.stop(_render);
          setIsGameOver(true);
          return;
        }
      });
    }

    Events.on(_engine, "collisionStart", handleCollisionStart);
    Events.on(_engine, "collisionActive", handleCollisionActive);
    Events.on(_mouseConstraint, "mousemove", (e) => {
      let x = e.source.mouse.position.x;
      if (x < 115) x = 115;
      if (x > 485) x = 485;

      Matter.Body.setPosition(bar, { x: x, y: 300 });
    });
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: Matter.IMouseEvent<Matter.MouseConstraint>) => {
      let x = e.source.mouse.position.x;
      if (x < 115) x = 115;
      if (x > 485) x = 485;

      if (nextFruit) Matter.Body.setPosition(nextFruit, { x: x, y: 38 });
    };

    if (mouseConstraint) Events.on(mouseConstraint, "mousemove", handleMouseMove);

    return () => {
      if (mouseConstraint) Events.off(mouseConstraint, "mousemove", handleMouseMove);
    };
  }, [nextFruit, mouseConstraint]);

  return (
    <>
      <div className="relative w-[600px] max-w-full">
        <div className="absolute top-2 left-2">
          <h1 className="text-xl font-bold">スイカのゲーム</h1>
          <p className="mt-2">
            スコア: <span className="text-2xl font-bold align-middle">{score}</span>
          </p>
        </div>
        <div className="absolute top-2 right-0 w-24 h-24 rounded-full flex items-center justify-center bg-blue-200 border-4 border-blue-300">
          <p className="absolute top-0 w-full text-center font-bold text-blue-500">NEXT</p>
          <img className="" src={`${BASE_PATH}/${nextFruits[1]}.png`} alt="" />
        </div>
      </div>
      {isGmaeOver && (
        <div className="py-8 bg-slate-300 w-full">
          <h2 className="text-3xl font-bold text-center">Game Over!</h2>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 text-white p-4"
              onClick={window.location.reload.bind(window.location)}
            >
              リスタート
            </button>
          </div>
        </div>
      )}
      <div ref={rootRef} id="game-board" className="h-full" onClick={handleClick}>
        <style>{`
      #game-board canvas {
        max-width: 100%;
        max-height: 100vh;
      }
      `}</style>
      </div>
    </>
  );
}
