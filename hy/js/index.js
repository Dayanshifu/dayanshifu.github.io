const 座位配置 = [
    { row: 0, seats: "ab ab ab ab ab ab ab 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 ab ab ab ab ab ab ab" },
    { row: 1, seats: "ab ab ab ab ab 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 ab ab ab ab ab" },
    { row: 2, seats: "ab ab ab ab 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 ab ab ab ab" },
    { row: 3, seats: "ab ab ab 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 ab ab ab" },
    { row: 4, seats: "ab ab 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 ab" },
    { row: 5, seats: "ab 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46" },
    { row: 6, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46" },
    { row: 7, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46" },
    { row: 8, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46" },
    { row: " ", seats: " " },
    ...Array.from({ length: 12 }, (_, i) => ({ row: i + 9, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46" })),
];
const 座位容器 = document.getElementById('座位容器');
const 开始按钮 = document.getElementById('开始按钮');
const 舞台显示 = document.getElementById('舞台区域');
const 轮次显示 = document.getElementById('轮次显示');
let 正在运行 = false;
let 当前高亮列表 = [];
let 座位元素集合 = {};
let 当前轮次 = 0;
const 总轮次数 = 5;
let 当前语音索引 = -1;
//const targetTime = new Date("2025-05-23T16:30:00").getTime();
const targetTime = new Date("2025-05-24T16:30:00").getTime();

const sounds = [
    { name: "Nahida", path: "https://static.codemao.cn/pickduck/SJQt97AWxg.mp3" },
    { name: "Hutao", path: "https://static.codemao.cn/pickduck/B127r70bgg.mp3" },
    { name: "Furina", path: "https://static.codemao.cn/pickduck/BJl0u70Wgg.mp3" },
    { name: "Klee", path: "https://static.codemao.cn/pickduck/S1yZ_mR-eg.mp3" },
    { name: "Ciallo～(∠・ω< )⌒★", path: "https://static.codemao.cn/pickduck/HJaHo7RZle.mp3" },
];
const 音乐 = new Audio();

function initScale() {
    const wrapper = document.getElementById('scaling-wrapper');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const widthRatio = windowWidth / 1200;
    const heightRatio = windowHeight / 800;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;

    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.documentElement.style.fontSize = `${scale * 16}px`;
}

function generateSeats() {
    座位配置.forEach(行信息 => {
        if (行信息.row === " ") {
            const 分隔行 = document.createElement('div');
            分隔行.className = '特殊行';
            分隔行.textContent = " ";
            座位容器.appendChild(分隔行);
            return;
        }

        const 行元素 = document.createElement('div');
        行元素.className = '行';

        const 左侧标签 = document.createElement('div');
        左侧标签.className = '行标签';
        左侧标签.textContent = `${行信息.row}排`;
        行元素.appendChild(左侧标签);

        const 区域 = 行信息.seats.split('ab');
        区域.forEach((区域内容, 索引) => {
            if (索引 > 0) {
                const 过道元素 = document.createElement('div');
                过道元素.className = '过道';
                行元素.appendChild(过道元素);
            }

            const 座位号 = 区域内容.trim().split(' ');
            座位号.forEach(座位 => {
                if (座位 === '') return;

                const 座位元素 = document.createElement('div');
                座位元素.className = '座位';
                座位元素.textContent = 座位;

                if (座位 === '1' || 座位 === '2') {
                    const 特殊座位元素 = document.createElement('div');
                    特殊座位元素.className = '座位';
                    特殊座位元素.textContent = 座位;
                    特殊座位元素.style.margin = 座位 === '1' ? '0 4px' : '0 2px';
                    行元素.appendChild(特殊座位元素);
                    座位元素集合[`${行信息.row}-${座位}`] = 特殊座位元素;
                } else {
                    行元素.appendChild(座位元素);
                    座位元素集合[`${行信息.row}-${座位}`] = 座位元素;
                }
            });
        });

        const 右侧标签 = document.createElement('div');
        右侧标签.className = '行标签';
        右侧标签.textContent = `${行信息.row}排`;
        行元素.appendChild(右侧标签);

        座位容器.appendChild(行元素);
    });
}

function 重置高亮() {
    当前高亮列表.forEach(元素 => 元素.classList.remove('高亮'));
    当前高亮列表 = [];
}

function 获取抽奖人数() {
    return 当前轮次 < 2 ? 3 : 2;
}

function 更新舞台显示(座位列表) {
    const 显示文本 = 座位列表.map(key => {
        const [排号, 座位号] = key.split('-');
        return `${排号}排${座位号}号`;
    }).join('  ');

    舞台显示.innerHTML = `<div class="高亮列表">${显示文本}</div>`;
}

function 执行抽奖(总步骤数, 当前步骤) {
    if (当前步骤 >= 总步骤数) {
        const 抽中列表 = [];
        const 需要人数 = 获取抽奖人数();
        const 可用座位 = Object.keys(座位元素集合);

        while (抽中列表.length < 需要人数 && 可用座位.length > 0) {
            const 随机索引 = Math.floor(Math.random() * 可用座位.length);
            const 随机座位键 = 可用座位.splice(随机索引, 1)[0];
            抽中列表.push(随机座位键);
        }

        重置高亮();
        抽中列表.forEach(key => {
            const 元素 = 座位元素集合[key];
            元素.classList.add('高亮');
            当前高亮列表.push(元素);
        });
        更新舞台显示(抽中列表);


        
        let now = new Date().getTime();
        let delay = targetTime - now;
        if (delay <= 0) {
            当前语音索引 = 当前轮次
            音乐.src = sounds[当前语音索引].path;
            音乐.play();
        }
        

        当前轮次++;
        轮次显示.textContent = `第 ${当前轮次}/${总轮次数} 轮`;
        if (当前轮次 >= 总轮次数) {
            开始按钮.textContent = "感谢参与";
            开始按钮.classList.add('active');
        } else {
            开始按钮.textContent = "继续抽奖";
        }
        正在运行 = false;
        开始按钮.disabled = false;
        开始按钮.textContent = 当前轮次 < 总轮次数 ? "继续抽奖" : "感谢参与";
        return;
    }

    
    重置高亮();
    const 临时人数 = 获取抽奖人数();
    const 可用座位 = Object.keys(座位元素集合);
    const 临时列表 = [];

    for (let i = 0; i < 临时人数; i++) {
        const 随机索引 = Math.floor(Math.random() * 可用座位.length);
        const 随机座位键 = 可用座位[随机索引];
        const 元素 = 座位元素集合[随机座位键];
        元素.classList.add('高亮');
        临时列表.push(随机座位键);
        当前高亮列表.push(元素);
    }

    更新舞台显示(临时列表);

    setTimeout(() => {
        执行抽奖(总步骤数, 当前步骤 + 1);
    }, 50 + (当前步骤 * 5));
}

window.addEventListener('load', function () {
    initScale();
    generateSeats();

    开始按钮.addEventListener('click', () => {
        if (当前轮次 >= 总轮次数) return;
        if (!正在运行) {
            if (当前轮次 >= 总轮次数) {
                当前轮次 = 0;
                重置高亮();
                舞台显示.textContent = "";
            }

            正在运行 = true;
            开始按钮.disabled = true;
            开始按钮.textContent = "抽奖中...";

            const 总步骤数 = 15 + Math.floor(Math.random() * 10);
            执行抽奖(总步骤数, 0);
        }
    });
});

window.addEventListener('resize', initScale);