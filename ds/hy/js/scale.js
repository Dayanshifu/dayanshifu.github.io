function initScale() {
    const wrapper = document.getElementById('scaling-wrapper');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 计算缩放比例
    const widthRatio = windowWidth / 1200;
    const heightRatio = windowHeight / 800;
    const scale = Math.min(widthRatio, heightRatio) * 0.95; // 留5%边距
    
    // 应用缩放
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    
    // 更新字体大小
    document.documentElement.style.fontSize = `${scale * 16}px`;
}

// 生成座位
function generateSeats() {
    const container = document.getElementById('seatsContainer');
    const rows = 15;
    const seatsPerRow = 10;
    
    // 清空容器
    container.innerHTML = '';
    
    // 添加特殊行（舞台前方）
    const specialRow = document.createElement('div');
    specialRow.className = '特殊行';
    specialRow.textContent = '★ VIP区域 ★';
    container.appendChild(specialRow);
    
    // 生成座位行
    for (let row = 1; row <= rows; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = '行';
        
        // 添加行标签
        const rowLabel = document.createElement('div');
        rowLabel.className = '行标签';
        rowLabel.textContent = String.fromCharCode(64 + row); // A, B, C...
        rowElement.appendChild(rowLabel);
        
        // 生成座位
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            // 添加过道
            if (seat === Math.ceil(seatsPerRow / 2)) {
                const aisle = document.createElement('div');
                aisle.className = '过道';
                rowElement.appendChild(aisle);
            }
            
            const seatElement = document.createElement('div');
            seatElement.className = '座位';
            seatElement.textContent = seat;
            seatElement.dataset.row = String.fromCharCode(64 + row);
            seatElement.dataset.seat = seat;
            
            // 添加点击事件
            seatElement.addEventListener('click', function() {
                this.classList.toggle('高亮');
                updateConfirmButton();
            });
            
            rowElement.appendChild(seatElement);
        }
        
        container.appendChild(rowElement);
    }
}

// 更新确认按钮状态
function updateConfirmButton() {
    const highlightedSeats = document.querySelectorAll('.座位.高亮');
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.disabled = highlightedSeats.length === 0;
}

// 重置座位选择
function resetSeats() {
    const seats = document.querySelectorAll('.座位.高亮');
    seats.forEach(seat => {
        seat.classList.remove('高亮');
    });
    updateConfirmButton();
}

// 初始化
window.addEventListener('load', function() {
    initScale();
    generateSeats();
    
    // 添加按钮事件
    document.getElementById('resetBtn').addEventListener('click', resetSeats);
    document.getElementById('confirmBtn').addEventListener('click', function() {
        const selectedSeats = Array.from(document.querySelectorAll('.座位.高亮'))
            .map(seat => `${seat.dataset.row}${seat.dataset.seat}`)
            .join(', ');
        alert(`已选择座位: ${selectedSeats}`);
    });
});

// 窗口大小改变时重新缩放
window.addEventListener('resize', function() {
    initScale();
});