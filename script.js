// 全局变量
let obtainedAnchors = []; // 已获得的锚点
let currentStory = null; // 当前故事
let currentPage = 0; // 当前页面索引（用于多页故事）

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    // 从localStorage加载已获得的锚点
    loadAnchors();
    
    // 显示故事选择页面
    showStorySelection();
    
    // 更新锚点显示
    updateAnchorsDisplay();
}

// 加载已获得的锚点
function loadAnchors() {
    const savedAnchors = localStorage.getItem('obtainedAnchors');
    if (savedAnchors) {
        obtainedAnchors = JSON.parse(savedAnchors);
    }
}

// 保存锚点到localStorage
function saveAnchors() {
    localStorage.setItem('obtainedAnchors', JSON.stringify(obtainedAnchors));
}

// 显示故事选择页面
function showStorySelection() {
    hideAllPages();
    document.getElementById('story-selection').style.display = 'block';
    renderStoryCards();
}

// 渲染故事卡片
function renderStoryCards() {
    const storiesGrid = document.getElementById('stories-grid');
    storiesGrid.innerHTML = '';

    storyData.stories.forEach(story => {
        const isUnlocked = checkStoryUnlock(story.id);
        const storyCard = createStoryCard(story, isUnlocked);
        storiesGrid.appendChild(storyCard);
    });
}

// 检查故事是否解锁
function checkStoryUnlock(storyId) {
    const requirements = storyData.anchorRequirements[storyId];
    if (requirements.length === 0) {
        return true; // 无需解锁条件
    }
    
    // 检查是否满足任一解锁条件
    return requirements.some(anchor => obtainedAnchors.includes(anchor));
}

// 创建故事卡片
function createStoryCard(story, isUnlocked) {
    const card = document.createElement('div');
    card.className = `story-card ${!isUnlocked ? 'locked' : ''}`;
    
    if (isUnlocked) {
        card.onclick = () => openStory(story.id);
    }
    
    card.innerHTML = `
        <div class="story-card-image">
            <img src="${story.image}" alt="${story.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display: none; align-items: center; justify-content: center; width: 100%; height: 100%; color: #6c757d; font-size: 0.9rem;">
                ${story.title}
            </div>
        </div>
        <div class="story-card-content">
            <h3 class="story-card-title">${story.title}</h3>
            <p class="story-card-description">${story.description}</p>
        </div>
    `;
    
    return card;
}

// 打开故事
function openStory(storyId) {
    const story = storyData.stories.find(s => s.id === storyId);
    if (!story) return;
    
    currentStory = story;
    currentPage = 0; // 重置页面索引
    hideAllPages();
    document.getElementById('story-reading').style.display = 'block';
    
    renderStory(story);
}

// 渲染故事内容
function renderStory(story) {
    // 设置故事标题
    document.getElementById('story-title').textContent = story.title;
    
    // 检查是否为多页故事
    if (story.pages) {
        renderStoryPage(story, currentPage);
    } else {
        // 单页故事（原有逻辑）
        renderSinglePageStory(story);
    }
}

// 渲染单页故事
function renderSinglePageStory(story) {
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = '';
    
    story.content.forEach(item => {
        if (item.type === 'text') {
            const textDiv = document.createElement('div');
            textDiv.className = 'story-text';
            textDiv.textContent = item.text;
            storyContent.appendChild(textDiv);
        } else if (item.type === 'image') {
            const imageDiv = document.createElement('div');
            imageDiv.innerHTML = `
                <img src="${item.src}" alt="故事插图" class="story-image" onerror="this.style.display='none';">
            `;
            storyContent.appendChild(imageDiv);
        }
    });
    
    // 渲染选择按钮
    renderChoices(story.choices);
}

// 渲染多页故事的指定页面
function renderStoryPage(story, pageIndex) {
    const page = story.pages[pageIndex];
    if (!page) return;
    
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = '';
    
    // 渲染页面内容
    page.content.forEach(item => {
        if (item.type === 'text') {
            const textDiv = document.createElement('div');
            textDiv.className = 'story-text';
            textDiv.textContent = item.text;
            storyContent.appendChild(textDiv);
        } else if (item.type === 'image') {
            const imageDiv = document.createElement('div');
            imageDiv.innerHTML = `
                <img src="${item.src}" alt="故事插图" class="story-image" onerror="this.style.display='none';">
            `;
            storyContent.appendChild(imageDiv);
        }
    });
    
    // 渲染选择按钮
    renderChoices(page.choices);
}

// 渲染选择按钮
function renderChoices(choices) {
    const choicesContainer = document.getElementById('story-choices');
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn';
        choiceBtn.textContent = choice.text;
        choiceBtn.onclick = () => makeChoice(choice);
        choicesContainer.appendChild(choiceBtn);
    });
}

// 做出选择
function makeChoice(choice) {
    // 检查是否为多页故事的页面跳转
    if (choice.nextPage !== undefined) {
        currentPage = choice.nextPage;
        renderStoryPage(currentStory, currentPage);
        return;
    }
    
    // 如果获得新锚点，添加到已获得锚点列表
    if (choice.anchor && !obtainedAnchors.includes(choice.anchor)) {
        obtainedAnchors.push(choice.anchor);
        saveAnchors();
        updateAnchorsDisplay();
    }
    
    // 显示结果页面
    showResult(choice);
}

// 显示结果页面
function showResult(choice) {
    hideAllPages();
    document.getElementById('result-page').style.display = 'block';
    
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = '';
    
    // 添加结果文字
    const resultText = document.createElement('div');
    resultText.className = 'result-text';
    resultText.textContent = choice.result;
    resultContent.appendChild(resultText);
    
    // 添加结果图片
    if (choice.image) {
        const resultImage = document.createElement('div');
        resultImage.innerHTML = `
            <img src="${choice.image}" alt="结果图片" class="result-image" onerror="this.style.display='none';">
        `;
        resultContent.appendChild(resultImage);
    }
    
    // 如果获得新锚点，显示通知
    if (choice.anchor && obtainedAnchors.includes(choice.anchor)) {
        const anchorNotification = document.createElement('div');
        anchorNotification.className = 'anchor-notification';
        anchorNotification.textContent = `🎉 获得新锚点：${choice.anchor}`;
        resultContent.appendChild(anchorNotification);
    }
}

// 更新锚点显示
function updateAnchorsDisplay() {
    const anchorsDisplay = document.getElementById('anchors-display');
    anchorsDisplay.innerHTML = '';
    
    // 显示所有可能的锚点
    Object.keys(storyData.anchorDescriptions).forEach(anchor => {
        const anchorItem = document.createElement('span');
        anchorItem.className = `anchor-item ${obtainedAnchors.includes(anchor) ? 'obtained' : ''}`;
        anchorItem.textContent = anchor;
        anchorsDisplay.appendChild(anchorItem);
    });
}

// 隐藏所有页面
function hideAllPages() {
    const pages = [
        'story-selection',
        'story-reading',
        'result-page'
    ];
    
    pages.forEach(pageId => {
        document.getElementById(pageId).style.display = 'none';
    });
}

// 重置游戏（清除所有锚点）
function resetGame() {
    obtainedAnchors = [];
    saveAnchors();
    updateAnchorsDisplay();
    showStorySelection();
}

// 添加重置按钮到页面（可选功能）
function addResetButton() {
    const footer = document.querySelector('.footer');
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '重置游戏';
    resetBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 10px;
        font-size: 0.9rem;
    `;
    resetBtn.onclick = resetGame;
    footer.appendChild(resetBtn);
}

// 页面加载完成后添加重置按钮
document.addEventListener('DOMContentLoaded', function() {
    // 延迟添加重置按钮，确保页面完全加载
    setTimeout(addResetButton, 1000);
}); 