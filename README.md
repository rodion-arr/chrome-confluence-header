# Confluence headers Chrome extension

Adds Notion-like floating headers for Confluence.

- After installation, you should see a floating headers list on the right of the Confluence pages.
- Go to any Cloud Confluence page, e.g. https://openmrs.atlassian.net/wiki/spaces/docs/pages/25467578/OpenMRS+from+Scratch
- You should see a floating headers list on the right of the page.
- Click on any header in the list to navigate to that header in the page.

<table>
  <tr>
    <td><img width="600" alt="Screenshot 2024-09-02 at 09 50 44" src="https://github.com/user-attachments/assets/02359a59-7e4d-4775-a81e-826d0ec0dfe2"></td>
    <td><img width="420" alt="Screenshot 2024-09-02 at 09 49 17" src="https://github.com/user-attachments/assets/d7f06958-6d82-47e3-9a27-55ef2ddd9e64"></td>
  </tr>
</table>

## Features

- Limited to Cloud Confluence pages only. `https://*.atlassian.net/wiki/"`
- Edit page mode is supported.
- Refreshes the headers list every 5 sec in collapsed state.

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/rodion-arr/chrome-confluence-header.git
   ```
2. Open Chrome
3. Go to `chrome://extensions/`
4. Enable `Developer mode`
5. Click on `Load unpacked`
6. Select the repo folder from the cloned repository

## Getting updates

1. Pull the latest changes
   ```bash
   git pull
   ```
2. Go to `chrome://extensions/`
3. Click on the refresh icon for the extension
