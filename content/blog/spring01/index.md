---
title: "Spring Boot实战读书笔记01"
date: 2019-06-04 16:51:56
description: "Spring Boot实战的读书笔记。"
---

# Why Spring Boot

正常使用Spring框架的情况下，即便是写一个简简单单的Hello World，我们也需要很多配置：

* 项目结构
* web.xml文件来声明Spring的`DispatcherServlet`
* 启用Spring MVC的Spring配置
* 一个Controller Class来处理Hello World逻辑
* Tomcat部署Web服务器

简简单单的写一个hello world却需要如此之多的先前配置。Spring Boot的诞生完全简化了这些步骤。

```groovy
@RestController
class HelloController {
    @RequestMapping("/")
    def hello() {
        return "Hello World"
    }
}
```

使用Spring Boot CLI：
```sh
spring run HelloController.groovy
```

## SpringBootApplication

使用Spring Initializr，我们可以在很短的时间内创建一个Spring Boot Application。在项目根目录下的/src/main/java的主程序引导类之前，我们需要加入`@SpringBootApplication`从而使用Spring Boot的众多功能。单单的这一行代码其实开启了Spring Boot的三个功能：
1. Spring的`@Configuration`。标明该类使用基于Java的配置。
2. Spring的`@ComponentScan`。启用组件扫描，这样只要我们的class之前标明了`@Controller`，Spring Boot就能自动帮我们找到他的位置。
3. Spring的`@EnableAutoConfiguration`。顾名思义，开启自动配置。

## User Authentication
使用Spring Boot使用户验证也变得很容易。在我们的Maven配置中加入：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

## 多Profile YAML文件进行配置
如果我们想有多个Configuration对spring boot进行配置怎么办？可以在application.yml中设置多个profile来迎合多个开发环境需求。

```yml
logging:
    level: 
        root: INFO

---

spring:
    profiles: development

logging:
    level:
        root: DEBUG

---

spring:
    profiles: production

logging:
    path: /tmp/
    file: BookWorm.log
    level:
        root: WARN
```

### 错误页配置

我们可以将一个error.html的thymeleaf模板放入`src/main/resources/templates`中。所有的静态文件应该放入`src/main/resources/static`中，比如图片等。

## 自动配置微调优先顺序

1. 命令行参数
2. `java:comp/env`里的JNDI属性
3. JVM系统属性
4. 操作系统环境变量
5. 随机生成的带`random.*`前缀的属性（在设置其他属性时，可以引用他们，比如`$(random.long)`）
6. 应用程序以外的application.properties或者application.yml文件
7. 打包在应用程序内的application.properties或者application.yml文件
8. 通过@PropertiySource标注的属性源
9. 默认属性
