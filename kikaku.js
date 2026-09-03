document.addEventListener('DOMContentLoaded', () => {
    // 1. モーダル開閉機能（出欠確認フォーム）
    const modal = document.getElementById('approvalModal');
    const openModalBtns = document.querySelectorAll('#headerApprovalBtn, #heroDemoBtn, #footerApprovalBtn');
    const closeModalBtn = document.querySelector('.close-btn');

    // モーダルを開く（複数のボタンに対応）
    openModalBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) modal.classList.add('active');
            });
        }
    });

    // モーダルを閉じる（✕ボタン）
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }

    // モーダルの背景クリックで閉じる
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // 2. フィードバックフォーム送信処理（モック）
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userName = document.getElementById('userName').value;
            const status = document.getElementById('approvalStatus').value;
            
            let statusText = '承認';
            if (status === 'conditional') statusText = '条件付き承認';
            if (status === 'rejected') statusText = '否決';

            alert(`【稟議送信完了】\nステークホルダー: ${userName}\n判定: ${statusText}\n\nご協力ありがとうございます。プロジェクトチームにデータが送信されました（モック）。`);
            
            // フォームをリセットしてモーダルを閉じる
            feedbackForm.reset();
            if (modal) modal.classList.remove('active');
        });
    }

    // 3. FAQ / リスクヘッジのアコーディオン動作
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if (answer) {
                // 表示・非表示をトグル
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                } else {
                    answer.style.display = 'block';
                }
            }
        });
    });

    // スクロール追従によるナビゲーション（タブ）のカレント表示
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // 画面中央付近を通過したセクションを検知
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

});