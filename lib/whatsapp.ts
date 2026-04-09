export async function sendWhatsAppTemplate(
  phone: string,
  templateName: string,
  params: Record<string, string>
) {
  const res = await fetch(
    `${process.env.WATI_BASE_URL}/api/v1/sendTemplateMessage`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WATI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_name: templateName,
        broadcast_name: `${templateName}_${Date.now()}`,
        receivers: [
          {
            whatsappNumber: phone,
            customParams: Object.entries(params).map(([name, value]) => ({
              name,
              value,
            })),
          },
        ],
      }),
    }
  );
  return res.json();
}
