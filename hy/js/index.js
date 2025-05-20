// 座位配置
const 座位配置 = [
    {row: 0, seats: "ab ab ab ab ab ab ab 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 ab ab ab ab ab ab ab"},
    {row: 1, seats: "ab ab ab ab ab 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 ab ab ab ab ab"},
    {row: 2, seats: "ab ab ab ab 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 ab ab ab ab"},
    {row: 3, seats: "ab ab ab 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 ab ab ab"},
    {row: 4, seats: "ab ab 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 ab"},
    {row: 5, seats: "ab 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46"},
    {row: 6, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46"},
    {row: 7, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46"},
    {row: 8, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46"},
    {row: " ", seats: " "},
    ...Array.from({length: 12}, (_, i) => ({row: i + 9, seats: "45 43 41 39 37 35 33 31 29 27 25 23 21 ab 19 17 15 13 11 9 7 5 3 1 2 4 6 8 10 12 14 16 18 20 ab 22 24 26 28 30 32 34 36 38 40 42 44 46"})),
    {row: " ", seats: " "}
];

// DOM元素
const 座位容器 = document.getElementById('座位容器');
const 开始按钮 = document.getElementById('开始按钮');
const 舞台显示 = document.getElementById('舞台区域');
let 正在运行 = false;
let 当前高亮 = null;
let 座位元素集合 = {};

// 初始化缩放
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

// 生成座位布局
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

// 执行抽奖动画
function 执行抽奖(总步骤数, 当前步骤) {
    if (当前步骤 >= 总步骤数) {
        正在运行 = false;
        开始按钮.disabled = false;
        开始按钮.textContent = "开始抽奖";
        return;
    }

    if (当前高亮) {
        当前高亮.classList.remove('高亮');
    }

    const 可用座位 = Object.keys(座位元素集合);
    const 随机座位键 = 可用座位[Math.floor(Math.random() * 可用座位.length)];
    const 座位元素 = 座位元素集合[随机座位键];
    
    座位元素.classList.add('高亮');
    当前高亮 = 座位元素;
    
    const [排号, 座位号] = 随机座位键.split('-');
    舞台显示.textContent = `${排号}排${座位号}号`;
    
    const 速度 = 50 + (当前步骤 * 5);
    setTimeout(() => {
        执行抽奖(总步骤数, 当前步骤 + 1);
    }, 速度);
}

// 初始化
window.addEventListener('load', function() {
    initScale();
    generateSeats();
    
    开始按钮.addEventListener('click', () => {
        if (!正在运行) {
            正在运行 = true;
            开始按钮.disabled = true;
            开始按钮.textContent = "抽奖中...";
            舞台显示.textContent = "";
            
            const 总步骤数 = 20 + Math.floor(Math.random() * 10);
            执行抽奖(总步骤数, 0);
        }
    });
});

// 窗口大小改变时重新缩放
window.addEventListener('resize', function() {
    initScale();
});