import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function fetchImageAsBlob(
  url: string,
): Promise<{ data: Buffer<ArrayBuffer>; mime: string } | null> {
  try {
    process.stdout.write(`\n  📥 Baixando imagem...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(` ⚠️ Falha: ${res.status}`);
      return null;
    }
    const mime = res.headers.get("content-type") ?? "image/jpeg";
    const arrayBuffer = (await res.arrayBuffer()) as ArrayBuffer;
    const data = Buffer.from(arrayBuffer) as Buffer<ArrayBuffer>;
    console.log(` ✅ ${(data.length / 1024).toFixed(1)}KB`);
    return { data, mime };
  } catch (err) {
    console.log(` ⚠️ Erro:`, err);
    return null;
  }
}

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "seed@techblog.com" },
    update: {},
    create: {
      name: "Tech Blog",
      email: "seed@techblog.com",
      password,
    },
  });

  console.log("✅ Usuário criado:", user.email);

  const articles = [
    {
      title: "O Futuro da Inteligência Artificial em 2025",
      category: "ia",
      imageUrl:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
      content: `## Introdução\n\nA inteligência artificial continua a evoluir em um ritmo acelerado. Neste artigo, vamos explorar as principais tendências e inovações que estão moldando o futuro da IA.\n\n## Modelos de Linguagem Avançados\n\nOs modelos de linguagem como GPT-4 e Claude estão se tornando cada vez mais sofisticados, capazes de entender e gerar texto com precisão impressionante.\n\n## Automação Inteligente\n\nA automação está alcançando novos patamares com sistemas de IA que podem tomar decisões complexas e adaptar-se a novas situações.\n\n## Ética e Responsabilidade\n\nCom o avanço da IA, questões éticas se tornam cada vez mais importantes. É crucial desenvolver sistemas responsáveis e transparentes.\n\n## Conclusão\n\nO futuro da IA é promissor, mas requer atenção cuidadosa aos seus impactos sociais e éticos.`,
    },
    {
      title: "Guia Completo de TypeScript para Iniciantes",
      category: "desenvolvimento-web",
      imageUrl:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
      content: `## O que é TypeScript?\n\nTypeScript é um superset do JavaScript que adiciona tipagem estática opcional à linguagem. Desenvolvido pela Microsoft, ele compila para JavaScript puro.\n\n## Por que usar TypeScript?\n\nTypeScript oferece diversas vantagens como detecção de erros em tempo de compilação, melhor autocompletar nas IDEs e código mais legível e manutenível.\n\n## Tipos Básicos\n\nOs tipos básicos do TypeScript incluem string, number, boolean, array, tuple, enum e any.\n\n## Interfaces\n\nInterfaces permitem definir contratos para objetos, garantindo que eles tenham as propriedades e métodos esperados.\n\n## Generics\n\nGenerics permitem criar componentes reutilizáveis que funcionam com diferentes tipos de dados.\n\n## Conclusão\n\nTypeScript é uma ferramenta poderosa que melhora significativamente a qualidade do código JavaScript.`,
    },
    {
      title: "Docker e Kubernetes: Containerização na Prática",
      category: "devops",
      imageUrl:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
      content: `## Introdução aos Containers\n\nContainers revolucionaram a forma como desenvolvemos e implantamos aplicações. Docker é a plataforma líder nesse espaço.\n\n## O que é Docker?\n\nDocker é uma plataforma que permite empacotar aplicações e suas dependências em containers isolados e portáteis.\n\n## Comandos Essenciais\n\nOs comandos mais utilizados incluem docker build, docker run, docker push e docker compose.\n\n## Kubernetes\n\nKubernetes é um sistema de orquestração de containers que automatiza a implantação, escalonamento e gerenciamento de aplicações.\n\n## Pods e Services\n\nPods são a menor unidade do Kubernetes, enquanto Services expõem os pods para comunicação interna e externa.\n\n## Conclusão\n\nDocker e Kubernetes formam uma combinação poderosa para modernizar sua infraestrutura.`,
    },
    {
      title: "React Native vs Flutter: Qual Escolher em 2025?",
      category: "mobile",
      imageUrl:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      content: `## Desenvolvimento Mobile Cross-Platform\n\nO desenvolvimento mobile cross-platform permite criar apps para iOS e Android com uma única base de código.\n\n## React Native\n\nReact Native, criado pelo Facebook, usa JavaScript e React para criar aplicações móveis nativas.\n\n## Flutter\n\nFlutter, criado pelo Google, usa a linguagem Dart e oferece uma abordagem diferente com widgets próprios.\n\n## Performance\n\nAmbas as plataformas oferecem boa performance, mas Flutter tende a ser mais consistente entre plataformas.\n\n## Ecossistema\n\nReact Native tem um ecossistema mais maduro, enquanto Flutter cresce rapidamente em popularidade.\n\n## Conclusão\n\nA escolha depende do seu contexto: React Native para times com experiência em React, Flutter para novos projetos.`,
    },
    {
      title: "OWASP Top 10: As Principais Vulnerabilidades Web",
      category: "seguranca",
      imageUrl:
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
      content: `## O que é OWASP?\n\nOWASP é uma fundação sem fins lucrativos que trabalha para melhorar a segurança de software.\n\n## Injection\n\nAtaques de injeção, como SQL Injection, ocorrem quando dados não confiáveis são enviados como parte de um comando.\n\n## Autenticação Quebrada\n\nFalhas na autenticação permitem que atacantes comprometam senhas, tokens de sessão e explorem outras falhas.\n\n## Exposição de Dados Sensíveis\n\nMuitas APIs e aplicações web não protegem adequadamente dados sensíveis como informações financeiras e de saúde.\n\n## XSS - Cross-Site Scripting\n\nFalhas XSS permitem que atacantes injetem scripts maliciosos em páginas web visualizadas por outros usuários.\n\n## Conclusão\n\nConhecer e mitigar as vulnerabilidades do OWASP Top 10 é fundamental para qualquer desenvolvedor web.`,
    },
    {
      title: "Next.js 15: Novidades e Melhorias",
      category: "desenvolvimento-web",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      content: `## O que há de novo no Next.js 15?\n\nO Next.js 15 trouxe diversas melhorias de performance e novas funcionalidades para o desenvolvimento web moderno.\n\n## Turbopack Estável\n\nO Turbopack finalmente chegou à estabilidade, oferecendo builds muito mais rápidos comparado ao Webpack.\n\n## React 19 Support\n\nNext.js 15 oferece suporte completo ao React 19, incluindo as novas Server Actions e melhorias nos hooks.\n\n## Caching Melhorado\n\nO sistema de caching foi completamente revisado, dando mais controle aos desenvolvedores sobre o comportamento do cache.\n\n## Melhorias de Performance\n\nDiversas otimizações foram feitas no bundle size e no tempo de carregamento inicial das páginas.\n\n## Conclusão\n\nNext.js 15 consolida sua posição como o framework React mais popular para produção.`,
    },
    {
      title: "Machine Learning com Python: Primeiros Passos",
      category: "ia",
      imageUrl:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      content: `## Introdução ao Machine Learning\n\nMachine Learning é um subcampo da IA que permite que sistemas aprendam e melhorem com a experiência.\n\n## Bibliotecas Essenciais\n\nAs principais bibliotecas são NumPy, Pandas, Scikit-learn, TensorFlow e PyTorch.\n\n## Tipos de Aprendizado\n\nExistem três tipos principais: supervisionado, não supervisionado e por reforço.\n\n## Preparação de Dados\n\nA preparação de dados é crucial e inclui limpeza, normalização e divisão em conjuntos de treino e teste.\n\n## Avaliação de Modelos\n\nMétricas como acurácia, precisão, recall e F1-score são usadas para avaliar a qualidade dos modelos.\n\n## Conclusão\n\nPython é a linguagem ideal para Machine Learning graças ao seu rico ecossistema de bibliotecas.`,
    },
    {
      title: "CI/CD com GitHub Actions: Automatize seu Deploy",
      category: "devops",
      imageUrl:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
      content: `## O que é CI/CD?\n\nCI/CD significa Integração Contínua e Entrega Contínua, práticas que automatizam o processo de build e deploy.\n\n## GitHub Actions\n\nGitHub Actions é uma plataforma de automação integrada ao GitHub que permite criar workflows customizados.\n\n## Criando seu primeiro Workflow\n\nWorkflows são definidos em arquivos YAML dentro do diretório .github/workflows do seu repositório.\n\n## Jobs e Steps\n\nCada workflow é composto por jobs, que por sua vez são compostos por steps que executam comandos ou actions.\n\n## Deploy Automatizado\n\nCom GitHub Actions, você pode automatizar o deploy para plataformas como Vercel, AWS, e Google Cloud.\n\n## Conclusão\n\nCI/CD com GitHub Actions reduz erros humanos e acelera o ciclo de desenvolvimento.`,
    },
    {
      title: "SwiftUI: Desenvolvimento iOS Moderno",
      category: "mobile",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      content: `## O que é SwiftUI?\n\nSwiftUI é o framework moderno da Apple para criar interfaces de usuário em todas as plataformas Apple.\n\n## Declarative UI\n\nSwiftUI usa uma abordagem declarativa, onde você descreve o que a interface deve mostrar, não como construí-la.\n\n## Views e Modifiers\n\nTudo no SwiftUI é uma View. Modifiers são usados para alterar a aparência e comportamento das views.\n\n## State Management\n\nSwiftUI oferece diversas formas de gerenciar estado: @State, @Binding, @ObservableObject e @EnvironmentObject.\n\n## Animações\n\nAnimações no SwiftUI são simples de implementar e muito poderosas, com suporte a transições e gestos.\n\n## Conclusão\n\nSwiftUI é o futuro do desenvolvimento Apple e vale muito a pena aprender.`,
    },
    {
      title: "Criptografia: Protegendo Dados em Aplicações Web",
      category: "seguranca",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      content: `## Por que Criptografia?\n\nA criptografia é fundamental para proteger dados sensíveis em trânsito e em repouso.\n\n## Criptografia Simétrica\n\nNa criptografia simétrica, a mesma chave é usada para criptografar e descriptografar dados. AES é o algoritmo mais popular.\n\n## Criptografia Assimétrica\n\nA criptografia assimétrica usa um par de chaves pública e privada. RSA e ECC são os algoritmos mais comuns.\n\n## HTTPS e TLS\n\nHTTPS usa TLS para criptografar a comunicação entre cliente e servidor, protegendo dados em trânsito.\n\n## Hashing de Senhas\n\nSenhas nunca devem ser armazenadas em texto plano. Use bcrypt, Argon2 ou scrypt para hash seguro.\n\n## Conclusão\n\nImplementar criptografia corretamente é essencial para qualquer aplicação que lida com dados sensíveis.`,
    },
    {
      title: "GraphQL vs REST: Quando Usar Cada Um?",
      category: "desenvolvimento-web",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      content: `## APIs Modernas\n\nA escolha entre GraphQL e REST é uma das decisões mais importantes no design de APIs modernas.\n\n## REST\n\nREST é um estilo arquitetural que usa HTTP para comunicação, com endpoints específicos para cada recurso.\n\n## GraphQL\n\nGraphQL é uma linguagem de consulta para APIs que permite aos clientes solicitar exatamente os dados que precisam.\n\n## Vantagens do GraphQL\n\nGraphQL elimina over-fetching e under-fetching, reduz o número de requests e tem um schema fortemente tipado.\n\n## Quando usar REST\n\nREST é ideal para APIs simples, quando o caching HTTP é importante ou quando a equipe tem mais experiência.\n\n## Conclusão\n\nNão há uma resposta única: a escolha depende do contexto, equipe e requisitos do projeto.`,
    },
    {
      title: "Redes Neurais: Entendendo o Deep Learning",
      category: "ia",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      content: `## O que são Redes Neurais?\n\nRedes neurais são modelos computacionais inspirados no cérebro humano, compostos por camadas de neurônios artificiais.\n\n## Perceptron\n\nO perceptron é o bloco básico de uma rede neural, realizando uma combinação linear das entradas seguida de uma função de ativação.\n\n## Backpropagation\n\nBackpropagation é o algoritmo usado para treinar redes neurais, calculando gradientes e ajustando pesos.\n\n## Redes Convolucionais\n\nCNNs são especialmente eficazes para processamento de imagens, usando filtros para detectar padrões visuais.\n\n## Transformers\n\nA arquitetura Transformer revolucionou o NLP e é a base de modelos como GPT e BERT.\n\n## Conclusão\n\nDeep Learning está transformando praticamente todos os campos da ciência e tecnologia.`,
    },
    {
      title: "Terraform: Infraestrutura como Código",
      category: "devops",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      content: `## O que é IaC?\n\nInfraestrutura como Código permite gerenciar e provisionar infraestrutura através de arquivos de configuração.\n\n## Terraform\n\nTerraform é a ferramenta de IaC mais popular, desenvolvida pela HashiCorp e compatível com múltiplos provedores cloud.\n\n## HCL - HashiCorp Configuration Language\n\nTerraform usa HCL, uma linguagem declarativa simples para descrever a infraestrutura desejada.\n\n## Providers\n\nProviders são plugins que permitem ao Terraform interagir com APIs de serviços como AWS, GCP e Azure.\n\n## State Management\n\nO state file do Terraform mantém o mapeamento entre recursos definidos no código e recursos reais.\n\n## Conclusão\n\nTerraform é essencial para qualquer time que trabalha com infraestrutura em nuvem em escala.`,
    },
    {
      title: "Kotlin Multiplatform: Um Código para Todas as Plataformas",
      category: "mobile",
      imageUrl:
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
      content: `## O que é Kotlin Multiplatform?\n\nKotlin Multiplatform permite compartilhar código entre diferentes plataformas como Android, iOS e Web.\n\n## Compartilhamento de Lógica\n\nA lógica de negócios pode ser compartilhada entre plataformas, enquanto a UI permanece nativa em cada uma.\n\n## Expect e Actual\n\nO mecanismo expect/actual permite definir APIs comuns e implementações específicas por plataforma.\n\n## Integração com Swift\n\nKotlin Multiplatform gera frameworks Swift que podem ser usados diretamente em projetos iOS.\n\n## Casos de Uso\n\nIdeal para apps que precisam de lógica complexa compartilhada, como sincronização de dados e regras de negócio.\n\n## Conclusão\n\nKotlin Multiplatform é uma abordagem madura e prática para desenvolvimento cross-platform.`,
    },
    {
      title: "Zero Trust Security: O Novo Paradigma de Segurança",
      category: "seguranca",
      imageUrl:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80",
      content: `## O que é Zero Trust?\n\nZero Trust é um modelo de segurança baseado no princípio de nunca confiar, sempre verificar.\n\n## Princípios Fundamentais\n\nOs três pilares do Zero Trust são: verificar explicitamente, usar acesso de menor privilégio e assumir violação.\n\n## Identidade como Perímetro\n\nNo modelo Zero Trust, a identidade do usuário e do dispositivo se torna o novo perímetro de segurança.\n\n## Microsegmentação\n\nA microsegmentação divide a rede em zonas menores para conter possíveis violações e limitar movimentos laterais.\n\n## Implementação\n\nImplementar Zero Trust é uma jornada que envolve MFA, PAM, monitoramento contínuo e criptografia end-to-end.\n\n## Conclusão\n\nZero Trust é o modelo de segurança mais adequado para o ambiente de trabalho moderno e distribuído.`,
    },
  ];

  for (const articleData of articles) {
    process.stdout.write(`\n📝 Criando: ${articleData.title}`);

    const image = await fetchImageAsBlob(articleData.imageUrl);

    await prisma.article.create({
      data: {
        title: articleData.title,
        category: articleData.category,
        content: articleData.content,
        bannerData: image?.data ?? null,
        bannerMimeType: image?.mime ?? null,
        authorId: user.id,
      },
    });

    console.log(`  ✅ Artigo salvo!`);
  }

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log("📧 Login: seed@techblog.com");
  console.log("🔑 Senha: 123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
