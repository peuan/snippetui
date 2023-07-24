import { chromium } from "playwright";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest, response: NextResponse) {
  let browser;
  try {
    const data = await request.json();
    const htmlContent = data.htmlContent;

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set the page content with the provided HTML
    await page.setContent(htmlContent);

    // Take a screenshot of the page and save it as PNG
    const screenshotBuffer = await page.screenshot({ type: "png" });

    // Generate a unique filename for the image
    const timestamp = Date.now();
    const fileName = `${timestamp}.png`;

    // Save the screenshot as a PNG file

    // Return the screenshot as the response body

    // Return the screenshot URL as part of the response
    const imagePath = path.resolve("./public/screenshots", fileName);
    await writeFile(imagePath, screenshotBuffer);
    console.log(imagePath);

    // Create a custom header with the imagePath
    const headers = new Headers();
    headers.set("X-Image-Path", imagePath);

    return new Response(screenshotBuffer, { status: 200, headers });
  } catch (error) {
    console.error("Error converting HTML to image:", error);
    return new Response("Error converting HTML to image", { status: 500 });
  } finally {
    if (browser) {
      // Close the browser

      await browser.close();
    }
  }
}
