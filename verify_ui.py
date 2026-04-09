import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    if not os.path.exists('/home/jules/verification'):
        os.makedirs('/home/jules/verification')

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        # We assume the dev server is running on 5173
        base_url = "http://localhost:5173"

        screens = [
            ("/", "welcome_fixed.png"),
            ("/flow", "flow_fixed.png"),
            ("/route-a", "route_a_fixed.png"),
            ("/route-b", "route_b_fixed.png"),
            ("/route-c", "route_c_fixed.png"),
            ("/safety", "safety_fixed.png"),
        ]

        for path, filename in screens:
            try:
                await page.goto(f"{base_url}{path}", wait_until="networkidle")
                # Wait a bit for animations/fonts
                await asyncio.sleep(1)
                await page.screenshot(path=f"/home/jules/verification/{filename}", full_page=True)
                print(f"Captured {filename}")
            except Exception as e:
                print(f"Failed to capture {path}: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
