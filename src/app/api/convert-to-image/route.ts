import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();
    const htmlContent = data.htmlContent;

    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    // Set the page content with the provided HTML
    await page.setContent(htmlContent);

    // Take a screenshot of the page and save it as PNG
    const screenshotBuffer = await page.screenshot({ type: "png" });

    // Close the browser
    await browser.close();

    // Return the screenshot as the response body
    return new Response(screenshotBuffer, { status: 200 });
  } catch (error) {
    console.error("Error converting HTML to image:", error);
    return new Response("Error converting HTML to image", { status: 500 });
  }
}
