import fetch from "node-fetch";

export async function handler(event) {
    try {
        const { nome, mensagem, token } = JSON.parse(event.body);

        // Verifica reCAPTCHA
        const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        const recaptchaData = await recaptchaResponse.json();
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "Falha na verificação do reCAPTCHA." })
            };
        }

        // Aqui, você poderia salvar no banco de dados ou planilha.
        console.log("Nova avaliação:", { nome, mensagem });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Erro no servidor" })
        };
    }
}
