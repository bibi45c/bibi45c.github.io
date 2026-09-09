# Obsidian 到 Blog 的迁移审阅

审阅日期：2026-08-27  
来源 vault：`D:\code\obsidian_db\bibi`  
原始笔记：303 篇 Markdown；本次未修改 vault 中的任何文件。

公开 Blog 现有 61 篇 MDX：其中 59 篇来自本次旧笔记整理（7 篇综述 + 52 篇短文），另有 2 篇为 2026 年的站点说明。迁入文章的 `publishedAt` 已按简历时间线排在 2019-11 至 2021-03，早于 2021-08 开始的 Big Data Engineer 经历。

## 已迁入的主题

以下文章是按主题合并、重写和脱敏后的公开版本，不是原笔记的逐文件复制：

| Blog MDX | 覆盖的原始主题 | 处理方式 |
| --- | --- | --- |
| `django-rest-framework-serializer-lifecycle.mdx` | DRF 框架、序列化器、视图集、Router | 合并并修正 `Serializer` 与 `ModelSerializer` 的保存语义 |
| `dockerfile-modern-basics.mdx` | docker（17 篇） | 更新 Dockerfile、端口与构建安全实践 |
| `flask-api-foundations.mdx` | Flask（62 篇） | 合并路由、响应、SQLAlchemy 与会话边界 |
| `pandas-data-import-export.mdx` | Data Analysis（12 篇） | 归并 Pandas 和 CSV/TSV/Excel I/O，增加 pickle 安全边界 |
| `django-admin-api-patterns.mdx` | 管理后台功能（40 篇） | 归并认证、授权、上传和删除一致性 |
| `ecommerce-order-consistency.mdx` | 商城类项目要点、头条资讯类项目 | 保留订单和并发的工程思路，补全原子库存扣减和幂等性 |
| `django-project-configuration.mdx` | 商城项目准备、缓存、日志、数据库配置 | 移除固定旧版本与硬编码配置，改为部署基线 |
| `pandas-csv-tsv-essentials.mdx`、`django-inventory-concurrency.mdx` | `Data Analysis/CSV TSV文件.md`、`商城并发问题.md` | 两篇均可公开；分别修正数据格式约定和库存原子扣减边界。 |
| `django-email-verification-flow.mdx`、`docker-image-labels.mdx`、`sqlalchemy-insert-basics.mdx` | 邮箱验证、Docker 维护者标签、SQLAlchemy 新增示例 | 可公开为通用技术文章；所有邮箱和凭据均使用不可用占位值。 |

其余 47 篇短文按单一知识点拆分：DRF 的 APIView、GenericAPIView、Router、action、字段校验、嵌套表示、分页与对象权限；Flask 的工厂、Blueprint、请求校验、Cookie、错误处理、上下文与 SQLAlchemy；Docker 的构建上下文、`COPY`、`CMD`、数据卷和 secret；以及电商购物车、事务、缓存、日志、任务队列、搜索、权限、指标和上传边界。

## 不应公开迁入的笔记

| 原始笔记 | 处理 | 原因 |
| --- | --- | --- |
| `Notion/Learn Space/Web Spider/极验验证--滑块验证.md` | 排除 | 自动识别并拖动验证码缺口，属于绕过网站反自动化验证的实现；页面结构和检测策略也已高度易变。 |
| `Notion/Learn Space/Web Spider/跳过阿里滑动验证码对selenium的校验.md` | 排除 | 通过修改自动化特征规避检测，不能作为公开工程实践。 |
| `Notion/Learn Space/Web Spider/selenium 解决鼠标拖动滑块慢的问题.md`、`Copy of selenium模拟登录解决滑块验证问题.md`、`Copy of selenium 反反爬 滑块验证.md` | 排除 | 与验证码绕过链路直接相关。 |
| `Notion/Learn Space/Web Spider/tips/navicat 导出已保存的密码.md` | 排除并建议本地加密保存 | 包含数据库账号、密码恢复/解密流程和疑似真实凭据。 |
| `Notion/Learn Space/商城类项目要点/邮箱发送并验证逻辑.md` | 仅迁入脱敏重写版 | 原文包含邮件服务凭据；Blog 版只使用环境变量占位符。 |
| `Notion/Learn Space/docker/DockerFile meiduo步骤.md` | 仅迁入脱敏重写版 | 原文维护者标签包含邮箱；Blog 版改为 OCI 风格非个人元数据。 |

## 已确认的过时或错误点

| 原始笔记 | 问题 | Blog 中的修正 |
| --- | --- | --- |
| `DRF框架/反序列化操作 数据保存.md` | 将默认 `create/update` 的描述泛化到了所有序列化器；`ModelSerializer` 对简单模型字段已有默认实现。 | 仅在嵌套写入、加密、跨模型事务等情况下自定义。 |
| `docker/DockerFile.md`、`DockerFile基础指令.md` | 教程风格未覆盖 `.dockerignore`、非 root、缓存、secret 和多阶段构建；个人维护者信息不适合公开。 | 使用最小运行时、非 root 用户和运行期注入密钥。 |
| `商城类项目要点/项目准备/项目准备.md` | 固定旧依赖；`grant all ... @ "%"` 权限过大；缓存代码多出 `]`，原样不可运行。 | 采用兼容矩阵、最小数据库权限、配置脱敏与语法检查。 |
| `Data Analysis/CSV TSV文件.md` | 原文的 Windows 路径字符串容易出现转义歧义；“CSV 是首选格式”过度概括。 | 已公开为独立短文，并改为显式声明 encoding、dtype 和 schema。 |
| `Flask/Flask.md` | `FLASK_APP` 环境变量仍可用，但不再是最清晰的当前入口；未强调开发服务器不能直接上生产。 | 使用 `flask --app ... run`，区分开发与生产部署。 |
| `商城类项目要点/商城并发问题.md` | 原乐观更新缺少库存下界、订单事务和重复提交防护，可能产生负库存或重复扣减。 | 已公开为独立短文，使用条件原子更新、事务和幂等键。 |
| `商城类项目要点/图片验证码标记设计.md` | 图片验证码本身不是账户安全的完整方案，且其 Redis/图片实现是项目特定旧教程。 | 不作为公开通用方案；生产系统应增加限流、风险控制和服务端验证。 |
| `Data Analysis/jupyter notebook 功能扩展包.md` | 依赖旧 Notebook 扩展生态，当前 JupyterLab 环境通常不适用。 | 未迁入；如要恢复该主题，应按当前 JupyterLab 版本重新验证。 |

## 迁移边界

1. 不复制 Obsidian 的 `notion-id`、双链、图片附件或本机路径。
2. 不公开任何密码、令牌、邮箱地址、内部 IP、连接串或个人维护者信息。
3. 不把旧教程的版本号、命令或第三方服务当成当前可用结论。
4. 本次只产出可公开的专题文章；其余原笔记继续保留在 vault，等待需要时按主题二次整理。
5. `publishedAt` 表示原始学习笔记的时间线；内容已在 2026-08 迁移时做过安全与有效性复核。
6. 2026-09-09 的正文扫描未发现手机号；Blog 未复制任何 Obsidian 附件到 `public/`。附件 OCR 已尝试，但本地引擎在单张附件推理时超时；在附件未公开前不构成站点暴露面。
