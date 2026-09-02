const WorldMapManager = {
  activeRegionId: "region_1",
  renderWorldMap() {
    const container = document.getElementById('level-nodes-container');
    if (!container) return;
    container.innerHTML = '';
    MASTER_LEVELS.forEach(lvl => {
      const prog = gameState.levelsProgress[lvl.id] || { unlocked: lvl.id === 1, completed: false, stars: 0 };
      const node = document.createElement('button');
      node.className = `level-node ${prog.completed ? 'completed' : (prog.unlocked ? 'current' : 'locked')}`;
      node.innerHTML = `<span>${lvl.id}</span>`;
      if (prog.completed) node.innerHTML += `<div class="level-stars">${'⭐'.repeat(prog.stars)}</div>`;
      if (prog.unlocked) {
        node.addEventListener('click', () => { if (typeof startLevel === 'function') startLevel(lvl.id); });
      }
      container.appendChild(node);
    });
  }
};
