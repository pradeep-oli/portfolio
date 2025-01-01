class GlowingBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.glowPoints = [
            { x: 0, y: 0, baseX: 0.2, baseY: 0.2, speedX: 0.0002, speedY: 0.0003, radius: 0.5 },
            { x: 0, y: 0, baseX: 0.8, baseY: 0.5, speedX: 0.0003, speedY: 0.0002, radius: 0.6 },
            { x: 0, y: 0, baseX: 0.5, baseY: 0.8, speedX: 0.0002, speedY: 0.0002, radius: 0.4 }
        ];

        this.init();
        this.animate();
    }

    init() {
        this.canvas.id = 'gradient-canvas';
        document.body.prepend(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
    }

    createGlow(x, y, radius, intensity = 1) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.4 * intensity})`);    // Bright blue center
        gradient.addColorStop(0.4, `rgba(59, 130, 246, ${0.2 * intensity})`);  // Mid blue
        gradient.addColorStop(0.7, `rgba(59, 130, 246, ${0.1 * intensity})`);  // Fading blue
        gradient.addColorStop(1, 'rgba(10, 10, 41, 0)');        // Transparent edge
        return gradient;
    }

    updateGlowPoints() {
        this.time += 1;
        this.glowPoints.forEach(point => {
            // Create smooth orbital motion
            point.x = this.canvas.width * (point.baseX + Math.sin(this.time * point.speedX) * 0.15);
            point.y = this.canvas.height * (point.baseY + Math.cos(this.time * point.speedY) * 0.15);
        });
    }

    draw() {
        // Clear canvas with dark background
        this.ctx.fillStyle = '#0a0a29';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw primary glow points
        this.glowPoints.forEach(point => {
            const radius = Math.min(this.canvas.width, this.canvas.height) * point.radius;
            
            // Draw main glow
            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.fillStyle = this.createGlow(point.x, point.y, radius, 1);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw intense center
            this.ctx.fillStyle = this.createGlow(point.x, point.y, radius * 0.5, 1.5);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });

        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';

        // Add subtle dark gradient overlay for depth
        const overlay = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        overlay.addColorStop(0, 'rgba(10, 10, 41, 0.8)');
        overlay.addColorStop(0.5, 'rgba(10, 10, 41, 0.5)');
        overlay.addColorStop(1, 'rgba(10, 10, 41, 0.8)');
        this.ctx.fillStyle = overlay;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.updateGlowPoints();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Start animation when page loads
window.addEventListener('load', () => {
    new GlowingBackground();
});
